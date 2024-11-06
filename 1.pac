function FindProxyForURL(url, host) {
    // 定义需要通过第一个代理的URL清单
    var proxyUrlList = [
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
        "cnn.com",
        "cloudflare.com",
        "perplexity.ai"
    ];

    // 定义需要被阻止的域名清单
    var blockedDomains = [
        "store.wiris.com",
        "sogowan.com",
         "awaliwa.com",
         "example.org"
    ];

    // 定义需要直接连接的域名清单
    var directUrlList = [
        "jd.com",
        "smzdm.com",
        "taobao.com"
    ];

    // 检查是否在被阻止的域名清单中
    for (var j = 0; j < blockedDomains.length; j++) {
        if (dnsDomainIs(host, blockedDomains[j])) {
            return "PROXY 0.0.0.0:0"; // 返回无效代理以阻止访问
        }
    }

    // 检查是否为以 .cn 结尾的域名
    if (shExpMatch(host, "*.cn")) {
        return "DIRECT"; // 直接连接 .cn 域名
    }

    // 检查是否在192.168.200.0/24网段内
    if (isInNet(dnsResolve(host), "192.168.200.0", "255.255.255.0")) {
        return "DIRECT"; // 直接连接192.168.200.0/24网段
    }

    // 检查是否在直接连接的域名清单中
    for (var k = 0; k < directUrlList.length; k++) {
        if (dnsDomainIs(host, directUrlList[k])) {
            return "DIRECT"; // 直接连接指定域名
        }
    }

    // 遍历代理URL清单，检查是否匹配
    for (var i = 0; i < proxyUrlList.length; i++) {
        if (shExpMatch(host, proxyUrlList[i])) {
            return "PROXY 192.168.200.199:20172"; // 使用第一个代理
        }
    }

    // 默认代理
    return "PROXY 192.168.200.180:20172"; // 使用默认代理
}
