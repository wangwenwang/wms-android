package com.cy_scm.wms_android;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
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

        //在js中调用本地java方法
        mWebView.addJavascriptInterface(new JsInterface(this), "CallAndroidOrIOS");

        Log.d("LM", "程序启动");

    }

    // js调用java
    private class JsInterface {
        private Context mContext;

        public JsInterface(Context context) {
            this.mContext = context;
        }

        //在js中调用window.CallAndroidOrIOS.callAndroid(name)，便会触发此方法。
        @JavascriptInterface
        public void callAndroid(String name) {

            Log.d("LM", "程序启动11122212" + name);
        }
    }

    // java调用js
    public void sendInfoToJs(View view) {

        //调用js中的函数：showInfoFromJava(msg)
                    Log.d("LM", "程序启动11777");
        mWebView.loadUrl("javascript:showInfoFromJava()");
    }
}
