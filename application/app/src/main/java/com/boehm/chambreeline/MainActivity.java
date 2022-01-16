package com.boehm.chambreeline;

import android.os.Build;
import android.os.Bundle;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;


import java.io.InputStream;

public class MainActivity extends AppCompatActivity {
    private void setupContentContainer() {
        setContentView(R.layout.activity_main);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }

    private void setupGlobalCookieStorage() {
        CookieManager.setAcceptFileSchemeCookies(true);
        CookieManager.getInstance().setAcceptCookie(true);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);


        setupGlobalCookieStorage();
        setupContentContainer();
        setupWebView();
    }

    private void setupWebView() {
        final WebView webView = locateIndexWebView();

        webView.setWebChromeClient(new WebChromeClient(){
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                runOnUiThread(() -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        String[] PERMISSIONS = {
                                PermissionRequest.RESOURCE_AUDIO_CAPTURE,
                                PermissionRequest.RESOURCE_VIDEO_CAPTURE
                        };
                        request.grant(PERMISSIONS);
                    }
                });
            }
        });

        setupWebViewCookieStorage(webView);
        setupWebViewSettings(webView);
        setupWebViewContent(webView);
    }

    private WebView locateIndexWebView() {
        return (WebView) findViewById(R.id.webview);
    }

    private void setupWebViewCookieStorage(final WebView webView) {
        if (Build.VERSION.SDK_INT >= 21) {
            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
        }
    }

    private void setupWebViewSettings(final WebView webView) {
        final WebSettings webSettings = webView.getSettings();

        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setSupportZoom(false);
    }

    private void setupWebViewContent(final WebView webView) {
        webView.loadUrl("file:///android_asset/" + getIndexHtml());
//        webView.loadDataWithBaseURL("file:///android_asset/", getIndexHtml(), "text/html", "utf-8", "about:blank");
    }

    private String getIndexHtml() {
        return "index.html";
    }
}