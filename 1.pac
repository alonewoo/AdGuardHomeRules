function FindProxyForURL(urlList, host) {
    // 定义需要通过第一个代理的URL清单
    var urlList = [
        // 在此处添加更多的网址
        "google.com",
        "twitter.com",
        "xda-developers.com",
        "youtube.com",
        "feedly.com",
        "github.com",
        "epochtimes.com",
        "nytimes.com",
        "bbc.com",
        "facebook.com",
        "isexsex.com",
        "gmail.com",
        "perplexity.ai"
    ];

    // 遍历清单，检查是否匹配
    for (var i = 0; i < urlList.length; i++) {
        if (shExpMatch(host, urlList[i])) {
            return "PROXY 192.168.200.199:20172";
        }
    }

    // 默认代理
    return "PROXY 192.168.200.180:20172";
}

