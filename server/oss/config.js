oss = null;
Meteor.startup(function() {
    oss = new ALY.OSS({
        accessKeyId: "yYlOJE1T4NmsAi69",
        secretAccessKey: "Rgq8ToXYEcp5Xn28oOWyfRRyD5Y3U5",
		endpoint: "http://oss-cn-beijing.aliyuncs.com", //测试环境
		// endpoint: 'http://oss-cn-beijing-internal.aliyuncs.com', //线上环境
        apiVersion: '2013-10-15'
    });
});

