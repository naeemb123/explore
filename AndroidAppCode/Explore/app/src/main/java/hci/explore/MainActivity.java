package hci.explore;

import android.app.Activity;

import android.webkit.WebView;
import android.os.Bundle;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);


        WebView webView = (WebView) findViewById(R.id.webview_display);
        webView.setWebViewClient(new MyWebViewClient());
        webView.loadUrl("http://snapinn.com/explore/index.html");

        //zoom control
        //webView.getSettings().setBuiltInZoomControls(true);
        //webView.getSettings().setSupportZoom(true);

        //enabling DOM & javascript
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);

    }

    private class MyWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
    }

}