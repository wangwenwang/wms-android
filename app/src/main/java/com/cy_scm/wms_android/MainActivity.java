package com.cy_scm.wms_android;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.json.simple.JSONObject;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import static android.widget.Toast.LENGTH_LONG;


public class MainActivity extends Activity {
    public static WebView mWebView;

    static Context mContext;

    String inputName;

    // 微信开放平台APP_ID
    private static final String APP_ID = "wxf1af3db4c541e417";

    static public IWXAPI mWxApi;

    public final static String DestFileName = "saas-wms.apk";

    String server_App_Version;

    String server_App_Url;

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
        // 启用javascript
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setVerticalScrollbarOverlay(true);
        mWebView.loadUrl("file:///android_asset/www/index.html");

        // 在js中调用本地java方法
        mWebView.addJavascriptInterface(new JsInterface(this), "CallAndroidOrIOS");


        // 注册微信登录
        registToWX();
    }

    private void app_Version_Update() {

        new Thread() {
            public void run() {

                try {

                    JSONObject dict = Tools.getServerVersion();
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
                String startTime = readLatLng.getString("Set_User_Pass_Time", Tools.getCurrDate());
                String endTime = Tools.getCurrDate();
                long expTime = Tools.getTimeExpend(startTime, endTime);

                Log.d("LM", "expTime: " + expTime);

                // 记住密码后超过60分钟，自动忘记密码
                if(expTime <= 60) {

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            String url = "javascript:SetUserNameAndPassword('" + u + "','" + p + "')";
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
            }
        }

        @JavascriptInterface
        public void callAndroid(String exceName, String u, String p) {

            Log.d("LM", "执行:" + exceName + "    " + "用户名:" + u + "    " + "密码:" + p);

            // 当前时间
            String curDate = Tools.getCurrDate();

            if (exceName.equals("记住帐号密码")) {

                if (u != null && p != null) {

                    SharedPreferences crearPre = mContext.getSharedPreferences("w_UserInfo", MODE_PRIVATE);
                    crearPre.edit().putString("UserName", u).commit();
                    crearPre.edit().putString("Password", p).commit();
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
}