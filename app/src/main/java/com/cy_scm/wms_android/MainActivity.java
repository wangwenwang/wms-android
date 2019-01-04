package com.cy_scm.wms_android;

import android.Manifest;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.ClipData;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.json.simple.JSONObject;

import java.io.File;

import static android.widget.Toast.LENGTH_LONG;


public class MainActivity extends Activity {
    public static WebView mWebView;

    public static Context mContext;

    String inputName;

    // 微信开放平台APP_ID
    private static final String APP_ID = "wxf1af3db4c541e417";

    static public IWXAPI mWxApi;

    public final static String DestFileName = "saas-wms.apk";

    String server_App_Version;

    String server_App_Url;


    //5.0以下使用
    private ValueCallback<Uri> uploadMessage;
    // 5.0及以上使用
    private ValueCallback<Uri[]> uploadMessageAboveL;
    //图片
    private final static int FILE_CHOOSER_RESULT_CODE = 128;
    //拍照
    private final static int FILE_CAMERA_RESULT_CODE = 129;
    //拍照图片路径
    private String cameraFielPath;


    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        Log.d("LM", "程序启动");


        mContext = this;

        // 软件更新定时器，目前程序启动检查更新，以免有用户从不退出程序
        new Thread() {

            public void run() {

                while (true) {

                    // 30分钟检查一次
                    try {
                        sleep(1000 * 60 * 30);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    app_Version_Update();
                }
            }
        }.start();

        app_Version_Update();

        // 初始化windows
        this.getWindow().requestFeature(Window.FEATURE_PROGRESS);
        setContentView(R.layout.activity_main);
        getWindow().setFeatureInt(Window.FEATURE_PROGRESS, Window.PROGRESS_VISIBILITY_ON);

        mWebView = findViewById((R.id.webview));
        mWebView.getSettings().setTextZoom(100);

        // 启用javascript
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setVerticalScrollbarOverlay(true);
        mWebView.loadUrl("file:///android_asset/www/index.html");

        // 在js中调用本地java方法
        mWebView.addJavascriptInterface(new JsInterface(this), "CallAndroidOrIOS");




        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);    //设置webview支持javascript
//        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setLoadsImagesAutomatically(true);    //支持自动加载图片
        settings.setUseWideViewPort(true);    //设置webview推荐使用的窗口，使html界面自适应屏幕
        settings.setLoadWithOverviewMode(true);
        settings.setSaveFormData(true);    //设置webview保存表单数据
        settings.setSavePassword(true);    //设置webview保存密码

//        int mDensity = DensityUtils.getDensityDpi(context);
        int mDensity = 240;
        if (mDensity == 120) {
            settings.setDefaultZoom(WebSettings.ZoomDensity.CLOSE);
        } else if (mDensity == 160) {
            settings.setDefaultZoom(WebSettings.ZoomDensity.MEDIUM);
        } else if (mDensity == 240) {
            settings.setDefaultZoom(WebSettings.ZoomDensity.FAR);
        }
        settings.setDefaultZoom(WebSettings.ZoomDensity.MEDIUM);    //设置中等像素密度，medium=160dpi
        settings.setSupportZoom(true);    //支持缩放
        settings.setSupportMultipleWindows(true);
        settings.setAppCacheEnabled(true); //设置APP可以缓存
        settings.setDatabaseEnabled(true);
        settings.setDomStorageEnabled(true);//返回上个界面不刷新  允许本地缓存
        //        settings.setCacheMode(WebSettings.LOAD_DEFAULT);// 设置缓存LOAD_DEFAULT   LOAD_CACHE_ONLY,LOAD_NO_CACHE
        settings.setAllowFileAccess(true);// 设置可以访问文件
        settings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);//不支持放大缩小
        settings.setDisplayZoomControls(false);//不支持放大缩小
        //      NORMAL：正常显示，没有渲染变化。
        //      SINGLE_COLUMN：把所有内容放到WebView组件等宽的一列中。   //这个是强制的，把网页都挤变形了
        //      NARROW_COLUMNS：可能的话，使所有列的宽度不超过屏幕宽度。 //好像是默认的

        mWebView.setLongClickable(true);
        mWebView.setScrollbarFadingEnabled(true);
        mWebView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        mWebView.setDrawingCacheEnabled(true);
//覆盖WebView默认使用第三方或系统默认浏览器打开网页的行为，使网页用WebView打开
        mWebView.setWebChromeClient(new WebChromeClient() {
            // For Android < 3.0
            public void openFileChooser(ValueCallback<Uri> valueCallback) {
                uploadMessage = valueCallback;
                openImageChooserActivity();
            }

            // For Android  >= 3.0
            public void openFileChooser(ValueCallback valueCallback, String acceptType) {
                uploadMessage = valueCallback;
                openImageChooserActivity();
            }

            //For Android  >= 4.1
            public void openFileChooser(ValueCallback<Uri> valueCallback, String acceptType, String capture) {
                uploadMessage = valueCallback;
                openImageChooserActivity();
            }

            // For Android >= 5.0
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, WebChromeClient.FileChooserParams fileChooserParams) {
                uploadMessageAboveL = filePathCallback;
                openImageChooserActivity();
                return true;
            }
        });





        // 注册微信登录
        registToWX();
    }

    private void app_Version_Update() {

        new Thread() {
            public void run() {

                try {

                    JSONObject dict = Tools.getServerVersion(mContext);
                    server_App_Version = (String) dict.get("VERSION");
                    server_App_Url = (String) dict.get("UPDATEURL");
                    String loc_App_Version = Tools.getVerName(mContext);

                    int verCompare = Tools.compareVersion(server_App_Version, loc_App_Version);
                    Log.d("LM", "loc_App_Version: " + loc_App_Version);
                    Log.d("LM", "server_App_Version: " + server_App_Version);
                    Log.d("LM", "verCompare: " + verCompare);

                    if (verCompare == 1) {

                        // 检查存储权限
                        if (ContextCompat.checkSelfPermission(mContext, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                                != PackageManager.PERMISSION_GRANTED) {
                            ActivityCompat.requestPermissions((Activity) mContext, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                                    100);
                        } else {
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {

                                    showUpdataDialog();
                                }
                            });
                        }
                    }
                } catch (Exception e) {

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            Toast.makeText(mContext, "版本更新异常", LENGTH_LONG).show();
                        }
                    });
                }
            }

            ;
        }.start();
    }

    private void registToWX() {
        //AppConst.WEIXIN.APP_ID是指你应用在微信开放平台上的AppID，记得替换。
        mWxApi = WXAPIFactory.createWXAPI(this, APP_ID, false);
        // 将该app注册到微信
        mWxApi.registerApp(APP_ID);
    }


    // js调用java
    private class JsInterface extends Activity {
        private Context mContext;

        public JsInterface(Context context) {
            this.mContext = context;
        }

        //在js中调用window.CallAndroidOrIOS.callAndroid(name)，便会触发此方法。
        @JavascriptInterface
        public void callAndroid(String exceName, String inputName) {

            Log.d("LM", "执行:" + exceName + "    " + "输入框:" + inputName);
            MainActivity.this.inputName = inputName;

            if (exceName.equals("调用app原生扫描二维码/条码")) {

                Log.d("LM", "执行扫码");

                new Thread() {
                    public void run() {

                        IntentIntegrator integator = new IntentIntegrator(MainActivity.this);
                        integator.setDesiredBarcodeFormats(IntentIntegrator.ONE_D_CODE_TYPES);
                        integator.setPrompt("请扫描");
                        integator.setCameraId(0);
                        integator.setBeepEnabled(true); //扫描成功的「哔哔」声，默认开启
                        integator.setBarcodeImageEnabled(false);
                        integator.setCaptureActivity(ScanActivity.class);
                        integator.initiateScan();
                    }
                }.start();

            } else if (exceName.equals("播放警告音")) {

                Log.d("LM", "执行声音");

                MediaPlayer mMediaPlayer = MediaPlayer.create(mContext, R.raw.wrong01);
                mMediaPlayer.start();
            } else if (exceName.equals("微信登录")) {

                Log.d("LM", "微信登录");

                new Thread() {
                    public void run() {
                        if (!mWxApi.isWXAppInstalled()) {
                            Log.d("LM", "您还未安装微信客户端");
                            return;
                        } else {
                            Log.d("LM", "微信客户端已安装");
                        }
                        SendAuth.Req req = new SendAuth.Req();
                        req.scope = "snsapi_userinfo";//官方固定写法
                        req.state = "wechat_sdk_wms";//自定义一个字串
                        mWxApi.sendReq(req);
                    }
                }.start();
            } else if (exceName.equals("登录页面已加载")) {

                Log.d("LM", "登录页面已加载");


                SharedPreferences readLatLng = mContext.getSharedPreferences("w_UserInfo", MODE_MULTI_PROCESS);
                String u = readLatLng.getString("UserName", "");
                String p = readLatLng.getString("Password", "");
                String t = readLatLng.getString("Tenant_Code", "");
                String startTime = readLatLng.getString("Set_User_Pass_Time", Tools.getCurrDate());
                String endTime = Tools.getCurrDate();
                long expTime = Tools.getTimeExpend(startTime, endTime);


                Log.d("LM", "expTime: " + expTime);

                // 记住密码后超过60分钟，自动忘记密码
                if(expTime <= 60) {

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            String url = "javascript:SetUserNameAndPassword('" + u + "','" + p + "','" + t + "')";
                            MainActivity.mWebView.loadUrl(url);
                            Log.d("LM", url);
                        }
                    });
                }else {

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            String url = "javascript:SetUserNameAndPassword('" + "" + "','" + "" + "','" + t + "')";
                            MainActivity.mWebView.loadUrl(url);
                            Log.d("LM", url);
                        }
                    });
                }

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        String url = "javascript:VersionShow('" + "版本:" + Tools.getVerName(mContext) + "')";
                        MainActivity.mWebView.loadUrl(url);
                        Log.d("LM", url);
                    }
                });

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        String currSA = Tools.getCurrServerAddress(mContext);
                        if(currSA.equals("")) {

                            Log.d("LM", "首次安装，本地没有服务器，不发送服务器地址给vue");
                        }else {

                            String url = "javascript:SetServerAddressByPhoneCookie('" + currSA + "')";
                            MainActivity.mWebView.loadUrl(url);
                            Log.d("LM", url);
                        }
                    }
                });
            } else if (exceName.equals("记住服务器地址")) {

                if (exceName != null) {

                    Tools.setCurrServerAddress(mContext, inputName);
                }
            }
        }

        @JavascriptInterface
        public void callAndroid(String exceName, String u, String p, String t) {

            Log.d("LM", "执行:" + exceName + "    " + "用户名:" + u + "    " + "密码:" + p);

            // 当前时间
            String curDate = Tools.getCurrDate();

            if (exceName.equals("记住帐号密码")) {

                if (u != null && p != null) {

                    SharedPreferences crearPre = mContext.getSharedPreferences("w_UserInfo", MODE_PRIVATE);
                    crearPre.edit().putString("UserName", u).commit();
                    crearPre.edit().putString("Password", p).commit();
                    crearPre.edit().putString("Tenant_Code", t).commit();
                    crearPre.edit().putString("Set_User_Pass_Time", curDate).commit();
                }
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);

        if (result != null) {

            if (result.getContents() == null) {

                Toast.makeText(this, "已返回", LENGTH_LONG).show();
            } else {

                Toast.makeText(this, result.getContents(), LENGTH_LONG).show();

                String url = "javascript:QRScanAjax('" + result.getContents() + "')";
                MainActivity.mWebView.loadUrl(url);

                Log.d("LM", url);
                Log.d("LM", MainActivity.this.inputName);
            }

        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }


//        super.onActivityResult(requestCode, resultCode, data);
//        if (null == uploadMessage && null == uploadMessageAboveL) return;
//        if (resultCode != RESULT_OK) {//同上所说需要回调onReceiveValue方法防止下次无法响应js方法
//            if (uploadMessageAboveL != null) {
//                uploadMessageAboveL.onReceiveValue(null);
//                uploadMessageAboveL = null;
//            }
//            if (uploadMessage != null) {
//                uploadMessage.onReceiveValue(null);
//                uploadMessage = null;
//            }
//            return;
//        }
//        Uri result = null;
//        if (requestCode == FILE_CAMERA_RESULT_CODE) {
//            if (null != data && null != data.getData()) {
//                result = data.getData();
//            }
//            if (result == null && hasFile(cameraFielPath)) {
//                result = Uri.fromFile(new File(cameraFielPath));
//            }
//            if (uploadMessageAboveL != null) {
//                uploadMessageAboveL.onReceiveValue(new Uri[]{result});
//                uploadMessageAboveL = null;
//            } else if (uploadMessage != null) {
//                uploadMessage.onReceiveValue(result);
//                uploadMessage = null;
//            }
//        } else if (requestCode == FILE_CHOOSER_RESULT_CODE) {
//            if (data != null) {
//                result = data.getData();
//            }
//            if (uploadMessageAboveL != null) {
//                onActivityResultAboveL(data);
//            } else if (uploadMessage != null) {
//                uploadMessage.onReceiveValue(result);
//                uploadMessage = null;
//            }
//        }
    }


    /******************************************************** 版本更新功能 ********************************************************/
    /**
     * 弹出对话框
     */
    protected void showUpdataDialog() {
        AlertDialog.Builder builer = new AlertDialog.Builder(this);
        builer.setTitle("软件更新");
        builer.setMessage("新版本: " + server_App_Version);
        //当点确定按钮时从服务器上下载 新的apk 然后安装
        builer.setPositiveButton("确定", (dialog, which) -> downLoadApk());
        //当点取消按钮时不做任何举动
        builer.setNegativeButton("取消", (dialogInterface, i) -> {
        });
        AlertDialog dialog = builer.create();
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();
    }

    protected void installApk(File file) {

        Intent install = new Intent(Intent.ACTION_VIEW);
        install.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {//判读版本是否在7.0以上
            Uri apkUri = FileProvider.getUriForFile(mContext, mContext.getPackageName() + ".fileprovider", file);//在AndroidManifest中的android:authorities值
            install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            install.setDataAndType(apkUri, "application/vnd.android.package-archive");
        } else {
            install.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
        }
        startActivity(install);
//        mContext.startActivity(install);
    }

    protected void downLoadApk() {
        //进度条
        final ProgressDialog pd;
        pd = new ProgressDialog(this);
        pd.setCancelable(false);
        pd.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        pd.setMessage("正在下载更新");
        pd.show();
        pd.setOnKeyListener(onKeyListener);
        new Thread() {
            @Override
            public void run() {
                try {
                    File file = Tools.getFileFromServer(server_App_Url, pd);
                    //安装APK
                    installApk(file);
                    pd.dismiss(); //结束掉进度条对话框
                } catch (Exception e) {

                    Log.d("", "run: ");
                }
            }
        }.start();
    }

    // 下载进度时，点击屏幕不可取消
    private DialogInterface.OnKeyListener onKeyListener = new DialogInterface.OnKeyListener() {
        @Override
        public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
            if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_DOWN) {

            }
            return false;
        }
    };

    // android 7.0以上手机存储授权后回调
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {

        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (server_App_Version != null && !server_App_Version.equals("")) {

            showUpdataDialog();
        }
    }


    private void openImageChooserActivity() {
//        new MaterialDialog.Builder(this)
//                .items(R.array.photo)
//                .positiveText("取消")
//                .onPositive(new MaterialDialog.SingleButtonCallback() {
//                    @Override
//                    public void onClick(@NonNull MaterialDialog dialog, @NonNull DialogAction which) {
//                        if (uploadMessageAboveL != null) {
//                            uploadMessageAboveL.onReceiveValue(null);
//                            uploadMessageAboveL = null;
//                        }
//                        if (uploadMessage != null) {
//                            uploadMessage.onReceiveValue(null);
//                            uploadMessage = null;
//                        }
//                        dialog.dismiss();
//                    }
//                })
//                .cancelable(false)
//                .canceledOnTouchOutside(false)
//                .itemsCallback(new MaterialDialog.ListCallback() {
//                    @Override
//                    public void onSelection(MaterialDialog dialog, View itemView, int position, CharSequence text) {
//                        if (position == 0) {
//                            takeCamera();
//                        } else if (position == 1) {
//                            takePhoto();
//                        }
//                    }
//                }).show();
    }

    //选择图片
    private void takePhoto() {
        Intent i = new Intent(Intent.ACTION_GET_CONTENT);
        i.addCategory(Intent.CATEGORY_OPENABLE);
        i.setType("image/*");
        startActivityForResult(Intent.createChooser(i, "Image Chooser"), FILE_CHOOSER_RESULT_CODE);
    }

    //拍照
    private void takeCamera() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//        if (CommonUtil.hasSdcard()) {
            //这里可能需要检查文件夹是否存在
            //File file = new File(Environment.getExternalStorageDirectory() + "/APPNAME/");
            //if (!file.exists()) {
            //  file.mkdirs();
            //}
            cameraFielPath = Environment.getExternalStorageDirectory() + "upload.jpg";
            File outputImage = new File(cameraFielPath);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(outputImage));
            startActivityForResult(intent, FILE_CAMERA_RESULT_CODE);
//        }
    }

    /**
     * 判断文件是否存在
     */
    public static boolean hasFile(String path) {
        try {
            File f = new File(path);
            if (!f.exists()) {
                return false;
            }
        } catch (Exception e) {
            // TODO: handle exception
            return false;
        }
        return true;
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    private void onActivityResultAboveL(Intent intent) {
        Uri[] results = null;
        if (intent != null) {
            String dataString = intent.getDataString();
            ClipData clipData = intent.getClipData();
            if (clipData != null) {
                results = new Uri[clipData.getItemCount()];
                for (int i = 0; i < clipData.getItemCount(); i++) {
                    ClipData.Item item = clipData.getItemAt(i);
                    results[i] = item.getUri();
                }
            }
            if (dataString != null)
                results = new Uri[]{Uri.parse(dataString)};
        }
        uploadMessageAboveL.onReceiveValue(results);
        uploadMessageAboveL = null;
    }

    /**
     * 返回上一页
     */
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

        if (keyCode == KeyEvent.KEYCODE_BACK) {

            // 登录页时不允许返回上一页
            String uu = mWebView.getUrl();
            String tt = mWebView.getOriginalUrl();
            if(uu.equals("file:///android_asset/www/index.html#/")) {

                return false;
            }
            mWebView.goBack();
            Log.d("LM", "onKeyDown: ");
        }
        return false;
    }

    /**
     * 返回桌面
     */
    private void goHomeActivity(){
        Intent home = new Intent(Intent.ACTION_MAIN);
        home.addCategory(Intent.CATEGORY_HOME);
        startActivity(home);
    }
}