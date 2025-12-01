/**
 * PAC (Proxy Auto-Configuration) Script
 * 决定给定 URL 的流量应如何路由（直接连接、通过代理、或阻止）。
 *
 * @param {string} url 完整的 URL (例如: "http://www.example.com/page.html")
 * @param {string} host URL 的主机名部分 (例如: "www.example.com")
 * @returns {string} 代理配置字符串 (例如: "DIRECT" 或 "PROXY 192.168.200.199:20172")
 */
function FindProxyForURL(url, host) {

    // 代理服务器地址定义
    var PROXY_SERVER_1 = "PROXY 192.168.200.199:20172";
    var PROXY_SERVER_2 = "PROXY 192.168.200.180:20172";
    var BLOCK_PROXY = "PROXY 0.0.0.0:0"; // 用于阻止访问的无效代理

    // 定义需要通过第一个代理的 URL 清单 (使用通配符匹配)
    var proxyUrlList1 = [
        "*.google.com",
        "*.twitter.com",
        "*.xda-developers.com",
        "*.youtube.com",
        "*.feedly.com",
        "*.github.com",
        "*.epochtimes.com",
        "*.nytimes.com",
        "*.bbc.com",
        "*.facebook.com",
        "*.isexsex.com",
        "*.gmail.com",
        "*.cnn.com",
        "*.cloudflare.com",
        "*.airasia.com",
        "*.gemini.google.com",
        "*.perplexity.ai",
        "*.claude.ai",
        "*.grok.com",
        "*.zeabur.com",
        "*.chatgpt.com"
    ];

    // 定义需要通过第2个代理的 URL 清单 (使用通配符匹配)
    var proxyUrlList2 = [
        "*.69shuba.com",
        "*.69shuba.top",
        "*.qzz.io"
    ];

    // 定义需要被阻止的域名清单 (使用 dnsDomainIs 匹配，匹配主机名或其子域名)
    var blockedDomains = [
        "store.wiris.com",
        "sogowan.com",
        "awaliwa.com",
        "track.mob-trk.com",
        "doubleclick.net"
    ];

    // 定义需要直接连接的域名清单 (使用通配符或精确匹配)
    var directUrlList = [
        "*.jd.com",
        "*.sspai.com",
        "*.smzdm.com",
        "*.163.com",
        "*.sina.com",
        "*.tmall.com",
        "*.cnipa.gov.cn",
        "*.snapdrop.net",
        "*.1ptba.com",
        "*.wiz.cn",
        "*.qq.com",
        "*.alicdn.com",
        "*.taobao.com",
        "*.accuweather.com",
        "*.cponline.cnipa.gov.cn",
        "*.douban.com",
        "*.patent9.com",
        "*.test-ipv6.com",
        "*.vip.ffzy-video.com",
        "*.ffzy-video.com",
        "*.patentguru.com",
        // 苹果相关域名
        "a1.mzstatic.com", "a2.mzstatic.com", "a3.mzstatic.com", "a4.mzstatic.com", "a5.mzstatic.com",
        "adcdownload.apple.com.akadns.net", "adcdownload.apple.com", "amp-api-updates.apps.apple.com",
        "amp-api.media.apple.com", "api-p-ap-c.smoot.apple.com", "api-p-ap-d.smoot.apple.com",
        "api-p-ap-e.smoot.apple.com", "app-site-association.cdn-apple.com", "appldnld.apple.com",
        "appldnld.g.aaplimg.com", "appleid.cdn-apple.com", "apps.apple.com", "apps.mzstatic.com",
        "bag-cdn.itunes-apple.com.akadns.net", "cdn-cn1.apple-mapkit.com", "cdn-cn2.apple-mapkit.com",
        "cdn-cn3.apple-mapkit.com", "cdn-cn4.apple-mapkit.com", "cdn.apple-mapkit.com",
        "cdn1.apple-mapkit.com", "cdn2.apple-mapkit.com", "cdn3.apple-mapkit.com",
        "cdn4.apple-mapkit.com", "cds-cdn.v.aaplimg.com", "cds.apple.com.akadns.net",
        "cds.apple.com", "cdsassets.apple.com", "cl1-cdn.origin-apple.com.akadns.net",
        "cl1.apple.com", "cl2-cn.apple.com", "cl2.apple.com", "cl3-cdn.origin-apple.com.akadns.net",
        "cl3.apple.com", "cl4-cdn.origin-apple.com.akadns.net", "cl4-cn.apple.com",
        "cl4.apple.com", "cl5-cdn.origin-apple.com.akadns.net", "cl5.apple.com",
        "clientflow.apple.com.akadns.net", "clientflow.apple.com", "cn-smp-paymentservices.apple.com",
        "configuration.apple.com.akadns.net", "configuration.apple.com", "crl.apple.com",
        "cstat.apple.com", "cstat.cdn-apple.com", "dd-cdn.origin-apple.com.akadns.net",
        "dejavu.apple.com", "devimages-cdn.apple.com", "devstreaming-cdn.apple.com",
        "download.developer.apple.com", "experiments.apple.com", "gs-loc-cn.apple.com",
        "gs-loc.apple.com", "gsp10-ssl-cn.ls.apple.com", "gsp12-cn.ls.apple.com",
        "gsp13-cn.ls.apple.com", "gsp4-cn.ls.apple.com.edgekey.net.globalredir.akadns.net",
        "gsp4-cn.ls.apple.com.edgekey.net", "gsp4-cn.ls.apple.com", "gsp5-cn.ls.apple.com",
        "gsp85-cn-ssl.ls.apple.com", "gspe19-2-cn-ssl.ls-apple.com.akadns.net",
        "gspe19-2-cn-ssl.ls.apple.com", "gspe19-cn-ssl.ls.apple.com", "gspe19-cn.ls-apple.com.akadns.net",
        "gspe19-cn.ls.apple.com", "gspe21-ssl.ls.apple.com", "gspe21.ls.apple.com",
        "gspe35-ssl.ls.apple.com", "gspe79-cn-ssl.ls.apple.com", "guzzoni-apple-com.v.aaplimg.com",
        "guzzoni.apple.com", "guzzoni.smoot.apple.com", "iadsdk.apple.com",
        "icloud-cdn.icloud.com.akadns.net", "icloud.cdn-apple.com", "images.apple.com.akadns.net",
        "images.apple.com.edgekey.net.globalredir.akadns.net", "images.apple.com",
        "init-kt.apple.com", "init-p01md-lb.push-apple.com.akadns.net", "init-p01md.apple.com",
        "init-p01st-lb.push-apple.com.akadns.net", "init-p01st.push.apple.com",
        "init-s01st-lb.push-apple.com.akadns.net", "init-s01st.push.apple.com",
        "init.ess.apple.com", "iosapps.itunes.g.aaplimg.com", "ipcdn.apple.com",
        "iphone-ld.apple.com", "iphone-ld.origin-apple.com.akadns.net",
        "is-ssl.mzstatic.com-cn-lb.itunes-apple.com.akadns.net", "is1-ssl.mzstatic.com",
        "is1.mzstatic.com", "is2-ssl.mzstatic.com", "is2.mzstatic.com", "is3-ssl.mzstatic.com",
        "is3.mzstatic.com", "is4-ssl.mzstatic.com", "is4.mzstatic.com", "is5-ssl.mzstatic.com",
        "is5.mzstatic.com", "itunes-apple.com.akadns.net", "itunes.apple.com",
        "itunesconnect.apple.com", "mesu-cdn.apple.com.akadns.net",
        "mesu-china.apple.com.akadns.net", "mesu.apple.com", "ml.cdn-apple.com",
        "music.apple.com", "ocsp-lb.apple.com.akadns.net", "ocsp.apple.com",
        "ocsp2-lb.apple.com.akadns.net", "ocsp2.apple.com", "oscdn.apple.com",
        "oscdn.origin-apple.com.akadns.net", "osxapps.itunes.g.aaplimg.com",
        "pancake.apple.com", "pancake.cdn-apple.com.akadns.net", "pba0.apple.com",
        "probe.siri.apple.com", "prod-support.apple-support.akadns.net",
        "publicassets.cdn-apple.com", "reserve-prime.apple.com", "s.mzstatic.com",
        "seed-sequoia.siri.apple.com", "seed-swallow.siri.apple.com", "seed.siri.apple.com",
        "sequoia.apple.com", "sh-pod2-smp-device.apple.com", "shazam-insights.cdn-apple.com",
        "smp-device-content.apple.com", "static.gc.apple.com",
        "stocks-sparkline-lb.apple.com.akadns.net", "stocks-sparkline.apple.com",
        "store.apple.com.edgekey.net.globalredir.akadns.net", "store.apple.com.edgekey.net",
        "store.apple.com", "store.storeimages.apple.com.akadns.net",
        "store.storeimages.cdn-apple.com", "support-china.apple-support.akadns.net",
        "support.apple.com", "swallow-apple-com.v.aaplimg.com", "swallow.apple.com",
        "swcatalog-cdn.apple.com.akadns.net", "swcatalog.apple.com", "swcdn.apple.com",
        "swcdn.g.aaplimg.com", "swdist.apple.com.akadns.net", "swdist.apple.com",
        "swscan-cdn.apple.com.akadns.net", "swscan.apple.com", "sylvan.apple.com",
        "tj-pod1-smp-device.apple.com", "updates-http.cdn-apple.com.akadns.net",
        "updates-http.cdn-apple.com", "updates.cdn-apple.com", "valid.apple.com",
        "valid.origin-apple.com.akadns.net", "weather-data.apple.com.akadns.net",
        "weather-data.apple.com", "weather-map.apple.com", "weather-map2.apple.com",
        "weatherkit.apple.com", "www.apple.com.edgekey.net.globalredir.akadns.net",
        "www.apple.com.edgekey.net", "www.apple.com", "xp.apple.com"
    ];

    /* --- 规则执行顺序开始 --- */

    // 1. 检查是否在被阻止的域名清单中 (最高优先级)
    for (var j = 0; j < blockedDomains.length; j++) {
        if (dnsDomainIs(host, blockedDomains[j])) {
            return BLOCK_PROXY; // 返回无效代理以阻止访问
        }
    }

    // 2. 检查是否匹配 Proxy 1 的清单
    for (var i = 0; i < proxyUrlList1.length; i++) {
        // shExpMatch 用于通配符匹配 (如 *.google.com)
        if (shExpMatch(host, proxyUrlList1[i])) {
            return PROXY_SERVER_1;
        }
    }

    // 3. 检查是否匹配 Proxy 2 的清单
    for (var k = 0; k < proxyUrlList2.length; k++) {
        if (shExpMatch(host, proxyUrlList2[k])) {
            return PROXY_SERVER_2;
        }
    }

    // 4. 检查是否为以 .cn 结尾的域名
    // 注意：这条规则放在代理清单之后，可以确保代理清单中的 *.github.com 等不会被 *.cn 规则覆盖。
    if (shExpMatch(host, "*.cn")) {
        return "DIRECT";
    }

    // 5. 检查是否为内部或特定直连 IP 范围
    // **性能提示：** 频繁使用 dnsResolve() 会导致浏览器在执行 DNS 查询时阻塞，可能影响性能。
    // 只有在确定需要根据解析出的 IP 地址进行路由决策时才使用此方法。
    var resolvedIp = dnsResolve(host);
    if (isInNet(resolvedIp, "192.168.200.0", "255.255.255.0") ||
        isInNet(resolvedIp, "101.33.17.0", "255.255.255.0") ||
        isInNet(resolvedIp, "192.168.196.0", "255.255.255.0")) {
        return "DIRECT";
    }

    // 6. 检查是否在直连域名清单中
    for (var n = 0; n < directUrlList.length; n++) {
        // 对于精确域名列表，使用 dnsDomainIs 性能会更好，但由于列表中包含通配符，
        // shExpMatch 依然是必要的。
        if (shExpMatch(host, directUrlList[n])) {
            return "DIRECT";
        }
    }

    // 7. 默认动作：使用默认代理 (或直接连接)
    // 根据您的需求，所有未匹配的流量将通过第一个代理
    return PROXY_SERVER_1;
}
