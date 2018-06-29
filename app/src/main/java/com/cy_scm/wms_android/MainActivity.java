package com.cy_scm.wms_android;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebView;
import android.widget.EditText;
import android.widget.Toast;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

import static android.content.ContentValues.TAG;

public class MainActivity extends Activity {
    WebView mWebView;
    // Android版本变量
    final int version = Build.VERSION.SDK_INT;
    String inputName;

    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        final Activity mActivity = this;
        super.onCreate(savedInstanceState);

        this.getWindow().requestFeature(Window.FEATURE_PROGRESS);
        setContentView(R.layout.activity_main);

        getWindow().setFeatureInt(Window.FEATURE_PROGRESS, Window.PROGRESS_VISIBILITY_ON);

        mWebView=(WebView)findViewById((R.id.webview));
        // 启用javascript
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setVerticalScrollbarOverlay(true);
        mWebView.loadUrl("file:///android_asset/www/index.html");
//        mWebView.loadUrl("file:///android_asset/wms/dist/index.html");

        //在js中调用本地java方法
        mWebView.addJavascriptInterface(new JsInterface(this), "CallAndroidOrIOS");

        Log.d("LM", "程序启动");

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

            if(exceName.equals("我想调用app原生扫描二维码/条码")) {

                Log.d("LM", "执行扫码");


                new Thread(){
                    public void run() {

                        IntentIntegrator integator = new IntentIntegrator(MainActivity.this);
                        integator.setDesiredBarcodeFormats(IntentIntegrator.ONE_D_CODE_TYPES);
                        integator.setPrompt("请扫描");
                        integator.setCameraId(0);
                        integator.setBeepEnabled(true); //扫描成功的「哔哔」声，默认开启
                        integator.setBarcodeImageEnabled(false);
                        integator.setCaptureActivity(ScanActivity.class);
                        integator.initiateScan();
                    };
                }.start();

            }else if(exceName.equals("我想播放警告音")) {

                Log.d("LM", "执行声音");

                MediaPlayer mMediaPlayer= MediaPlayer.create(mContext, R.raw.wrong01);
                mMediaPlayer.start();
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);

        if(result != null) {

            if(result.getContents() == null) {

                Toast.makeText(this, "ffff", Toast.LENGTH_LONG).show();
            }else {

                Toast.makeText(this, result.getContents(), Toast.LENGTH_LONG).show();

                String url = "javascript:QRScanAjax('" + result.getContents() + "')";
                mWebView.loadUrl(url);

                Log.d("LM", url);
                Log.d("LM", MainActivity.this.inputName);
            }

        }
        else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
}
