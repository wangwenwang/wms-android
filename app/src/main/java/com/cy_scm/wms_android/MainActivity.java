package com.cy_scm.wms_android;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


public class MainActivity extends Activity {
    public static WebView mWebView;
    // Android版本变量
    final int version = Build.VERSION.SDK_INT;
    String inputName;

    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        this.getWindow().requestFeature(Window.FEATURE_PROGRESS);
        setContentView(R.layout.activity_main);

        getWindow().setFeatureInt(Window.FEATURE_PROGRESS, Window.PROGRESS_VISIBILITY_ON);


        mWebView = (WebView) findViewById((R.id.webview));
        // 启用javascript
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setVerticalScrollbarOverlay(true);
        mWebView.loadUrl("file:///android_asset/www/index.html");

        //在js中调用本地java方法
        mWebView.addJavascriptInterface(new JsInterface(this), "CallAndroidOrIOS");

        String str = "{" + "\"" + "latitude" + "\"" + ":" + 30.23 + "," + "\"" + "longitude"
                + "\"" + ":" + 114.57 + "}";
        System.out.println(str + "\n" + str.getClass());
        try {
            JSONObject jsonObj = (JSONObject) (new JSONParser().parse(str));
            System.out.println(jsonObj.toJSONString() + "\n" + jsonObj.getClass());
            double latitude = (double) jsonObj.get("latitude");
            System.out.println(latitude);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Log.d("LM", "程序启动");

        registToWX();
    }

    // 微信开放平台APP_ID
    private static final String APP_ID = "wxf1af3db4c541e417";

    static public IWXAPI mWxApi;

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
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);

        if (result != null) {

            if (result.getContents() == null) {

                Toast.makeText(this, "已返回", Toast.LENGTH_LONG).show();
            } else {

                Toast.makeText(this, result.getContents(), Toast.LENGTH_LONG).show();

                String url = "javascript:QRScanAjax('" + result.getContents() + "')";
                MainActivity.mWebView.loadUrl(url);

                Log.d("LM", url);
                Log.d("LM", MainActivity.this.inputName);
            }

        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
}
