package com.cy_scm.wms_android;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebView;
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
        mWebView.loadUrl("file:///android_asset/www/index.html");

//        mWebView.addJavascriptInterface(this, "callandroidorios");
        Log.d("LM", "程序启动");


//// 因为该方法在 Android 4.4 版本才可使用，所以使用时需进行版本判断
//        if (version < 18) {
//            mWebView.loadUrl("javascript:scan()");
//        } else {
//            mWebView.evaluateJavascript("javascript:scan()", new ValueCallback<String>() {
//                @Override
//                public void onReceiveValue(String value) {
//                    //此处为 js 返回的结果
//                            Log.d("LM", "程序启动11122");
//                }
//            });
//        }
    }

//    // 添加接口
//    public void addJavascriptInterface (Object object, String name){
//
//
//        Log.d("LM", "程序启动222");
//    }
//
////    @JavascriptInterface
//    public void hello(String string) {
//        System.out.println("js调用了这个方法:" + string);
//        Log.d("LM", "程序启动11");
//    }
}
