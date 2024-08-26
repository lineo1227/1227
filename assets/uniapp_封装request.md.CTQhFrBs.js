import{_ as s,c as n,o as a,a4 as e}from"./chunks/framework.BMGVR9vJ.js";const g=JSON.parse('{"title":"uniapp-request 封装","description":"","frontmatter":{},"headers":[],"relativePath":"uniapp/封装request.md","filePath":"uniapp/封装request.md"}'),p={name:"uniapp/封装request.md"},l=e(`<h1 id="uniapp-request-封装" tabindex="-1">uniapp-request 封装 <a class="header-anchor" href="#uniapp-request-封装" aria-label="Permalink to &quot;uniapp-request 封装&quot;">​</a></h1><p>阿 lin 最近公司需要开发小程序和 h5，灵光一闪，要小程序以后还需要 h5，这这这...<br> 让我们隆重有请真神 <code>uniapp!!!</code></p><h4 id="为什么写这篇文章呢" tabindex="-1">为什么写这篇文章呢 <a class="header-anchor" href="#为什么写这篇文章呢" aria-label="Permalink to &quot;为什么写这篇文章呢&quot;">​</a></h4><p>既然写项目，肯定会封装接口，啊这，那你不用 axios?<br> 啊哈哈，那当然是我就想来点跟之前不一样的 <s>(觉得个人用到的功能都差不多)</s></p><h2 id="一-封装" tabindex="-1">一.封装 <a class="header-anchor" href="#一-封装" aria-label="Permalink to &quot;一.封装&quot;">​</a></h2><p>肯定是先来个目录<br><s>index.js 得有吧 request.js 得有吧</s> 你喜欢 哎呀随便命名拉 <img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9b38eb84f89e4db2a901f067a37fd4d2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbGluZW9f:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzk0MzAyNzIyNjEyNzgxIn0%3D&amp;rk3s=f64ab15b&amp;x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&amp;x-orig-expires=1725279798&amp;x-orig-sign=sdcgW2AOhRiS6u4Ge3lYZwEXWeQ%3D" alt="image.png"><br> 接下来我们一步一步来</p><h4 id="基本的-uni-request-调用" tabindex="-1">基本的  <code>uni.request</code>  调用 <a class="header-anchor" href="#基本的-uni-request-调用" aria-label="Permalink to &quot;基本的  \`uni.request\`  调用&quot;">​</a></h4><p>遥想当年,大学时期的我就是这么封装的</p><div class="language-request.js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">request.js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function apiRequest(options) {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        const requestOptions = {</span></span>
<span class="line"><span>            url: options.url,</span></span>
<span class="line"><span>            method: options.method || &quot;GET&quot;,</span></span>
<span class="line"><span>            data: options.data || {},</span></span>
<span class="line"><span>            header: options.header || {},</span></span>
<span class="line"><span>            success: (res) =&gt; {</span></span>
<span class="line"><span>                if (res.statusCode === 200) {</span></span>
<span class="line"><span>                    resolve(res.data);</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    reject(res);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            fail: (err) =&gt; {</span></span>
<span class="line"><span>                reject(err);</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>        uni.request(requestOptions);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="与文件上传合并统一" tabindex="-1">与文件上传合并统一 <a class="header-anchor" href="#与文件上传合并统一" aria-label="Permalink to &quot;与文件上传合并统一&quot;">​</a></h4><p>uniapp 也有文件上传的接口  <code>uni.uploadFile</code> 这样我们就实现了文件上传也是一致的请求方式</p><div class="language-request.js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">request.js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function apiRequest(options) {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        ... 同上</span></span>
<span class="line"><span>        if (options.filePath) {</span></span>
<span class="line"><span>            requestOptions.filePath = options.filePath;</span></span>
<span class="line"><span>            requestOptions.name = options.name || &quot;file&quot;;</span></span>
<span class="line"><span>            requestOptions.formData = options.formData || {};</span></span>
<span class="line"><span>            uni.uploadFile(requestOptions);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            uni.request(requestOptions);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="校验-token" tabindex="-1">校验 token <a class="header-anchor" href="#校验-token" aria-label="Permalink to &quot;校验 token&quot;">​</a></h4><p>呃呃呃,token 不要忘了呀,快把 token 校验加上<br> token 这就很多东西要说了</p><ol><li>获取 access_token 和 refresh_token(登录接口返回,请求接口时候带上)</li></ol><div class="language-request.js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">request.js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function apiRequest(options) {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        // 获取token</span></span>
<span class="line"><span>        const access_token = uni.getStorageSync(&quot;access_token&quot;);</span></span>
<span class="line"><span>        const refresh_token = uni.getStorageSync(&quot;refresh_token&quot;);</span></span>
<span class="line"><span>        const headers = {</span></span>
<span class="line"><span>            ...options.header,</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>        // 设置token</span></span>
<span class="line"><span>        headers[&quot;Authorization&quot;] = \`Bearer \${access_token}\`;</span></span>
<span class="line"><span>        ... 同上</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="2"><li>进行 token 校验(token 过期或者没有 token)</li></ol><div class="language-request.js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">request.js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function apiRequest(options) {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        // 获取token</span></span>
<span class="line"><span>        const access_token = uni.getStorageSync(&quot;access_token&quot;);</span></span>
<span class="line"><span>        const refresh_token = uni.getStorageSync(&quot;refresh_token&quot;);</span></span>
<span class="line"><span>        const headers = {</span></span>
<span class="line"><span>            ...options.header,</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>        // 设置token</span></span>
<span class="line"><span>        headers[&quot;Authorization&quot;] = \`Bearer \${access_token}\`;</span></span>
<span class="line"><span>        ... 同上</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="3"><li>token 过期进行无感刷新<br> 首先需要有 refreshToken 去获取 accessToken 接口</li></ol><div class="language-request.js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">request.js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function refreshAccessToken() {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        const refresh_token = uni.getStorageSync(&quot;refresh_token&quot;);</span></span>
<span class="line"><span>        if (!refresh_token) {</span></span>
<span class="line"><span>            reject(&quot;No refresh token available&quot;);</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        uni.request({</span></span>
<span class="line"><span>            url: \`xxx\`, // refreshToken获取accessToken的接口</span></span>
<span class="line"><span>            method: &quot;POST&quot;,</span></span>
<span class="line"><span>            data: {</span></span>
<span class="line"><span>                refresh_token: refresh_token,</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            success: (response) =&gt; {</span></span>
<span class="line"><span>                if (response.statusCode === 200 &amp;&amp; response.data.access_token) {</span></span>
<span class="line"><span>                    resolve(response.data); // 获取到token</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    reject(&quot;Failed to refresh token&quot;);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            fail: (error) =&gt; {</span></span>
<span class="line"><span>                reject(error);</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="4"><li>继续封装 <code>apiRequest</code><br> 可以弄一个白名单列表,不需要 token 比如我们的登录就是白名单</li></ol><div class="language-request.js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">request.js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function apiRequest(options) {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        // whiteList 白名单列表</span></span>
<span class="line"><span>        // whiteList.some 判断请求的接口是否在白名单内 一般请求的接口可能带有路径参数所以用上 includes()</span></span>
<span class="line"><span>        if (!whiteList.some((i) =&gt; options.url.includes(i)) &amp;&amp; (!access_token || !refresh_token)) {</span></span>
<span class="line"><span>            reject(&quot;No tokens available&quot;);</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        const requestOptions = {</span></span>
<span class="line"><span>           ... 同上</span></span>
<span class="line"><span>            success: (res) =&gt; {</span></span>
<span class="line"><span>                uni.hideLoading();</span></span>
<span class="line"><span>                if (res.statusCode === 200) {</span></span>
<span class="line"><span>                    resolve(res.data);</span></span>
<span class="line"><span>                } else if (res.statusCode === 401 &amp;&amp; !isLoginRequest) {</span></span>
<span class="line"><span>                    refreshAccessToken()</span></span>
<span class="line"><span>                        .then((newToken) =&gt; {</span></span>
<span class="line"><span>                            uni.setStorageSync(&quot;access_token&quot;, newToken.access_token);</span></span>
<span class="line"><span>                            uni.setStorageSync(&quot;refresh_token&quot;, newToken.refresh_token);</span></span>
<span class="line"><span>                        })</span></span>
<span class="line"><span>                        .catch((err) =&gt; {</span></span>
<span class="line"><span>                            reject(err);</span></span>
<span class="line"><span>                        });</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    reject(res);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            ... 同上</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ... 同上</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="5"><li>处理在 token 刷新过程中失败的请求 为了处理在 token 刷新过程中失败的请求，我们需要添加了一个失败的请求队列。当令牌刷新成功时，队列中的请求将被重新发送。如果令牌刷新失败，队列中的请求将被拒绝，并显示错误提示。<br><code>isRefreshing</code> 跟踪当前是否正在进行 access_token 的刷新过程<br><code>failedRequestsQueue</code>  用于暂存因 access_token 无效而失败的 API 请求。当 access_token 刷新成功后，这些暂存的请求将使用新的 access_token 重新发起。</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>    let isRefreshing = false;</span></span>
<span class="line"><span>    let failedRequestsQueue = [];</span></span>
<span class="line"><span>    export function apiRequest(options) {</span></span>
<span class="line"><span>        return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>            ... 同上</span></span>
<span class="line"><span>            const requestOptions = {</span></span>
<span class="line"><span>                ... 同上</span></span>
<span class="line"><span>                success: (res) =&gt; {</span></span>
<span class="line"><span>                    if (res.statusCode === 200) {</span></span>
<span class="line"><span>                        resolve(res.data);</span></span>
<span class="line"><span>                    } else if (res.statusCode === 401 &amp;&amp; !isLoginRequest) {</span></span>
<span class="line"><span>                        if (!isRefreshing) {</span></span>
<span class="line"><span>                            isRefreshing = true;</span></span>
<span class="line"><span>                            refreshAccessToken()</span></span>
<span class="line"><span>                                .then((newToken) =&gt; {</span></span>
<span class="line"><span>                                    uni.setStorageSync(&quot;access_token&quot;, newToken.access_token);</span></span>
<span class="line"><span>                                    uni.setStorageSync(&quot;refresh_token&quot;, newToken.refresh_token);</span></span>
<span class="line"><span>                                    isRefreshing = false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                                    // 重新调用所有失败的请求</span></span>
<span class="line"><span>                                    failedRequestsQueue.forEach((req) =&gt; req.onSuccess(newAccessToken.access_token));</span></span>
<span class="line"><span>                                    failedRequestsQueue = [];</span></span>
<span class="line"><span>                                })</span></span>
<span class="line"><span>                                .catch((err) =&gt; {</span></span>
<span class="line"><span>                                    isRefreshing = false;</span></span>
<span class="line"><span>                                    failedRequestsQueue.forEach((req) =&gt; req.onFailure(err));</span></span>
<span class="line"><span>                                    failedRequestsQueue = [];</span></span>
<span class="line"><span>                                    reject(err);</span></span>
<span class="line"><span>                                });</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                        // 暂存请求</span></span>
<span class="line"><span>                        const retryRequest = new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>                            failedRequestsQueue.push({</span></span>
<span class="line"><span>                                onSuccess: (newToken) =&gt; {</span></span>
<span class="line"><span>                                    headers[&quot;Authorization&quot;] = \`Bearer \${newToken}\`;</span></span>
<span class="line"><span>                                    apiRequest(options).then(resolve).catch(reject);</span></span>
<span class="line"><span>                                },</span></span>
<span class="line"><span>                                onFailure: (err) =&gt; {</span></span>
<span class="line"><span>                                    reject(err);</span></span>
<span class="line"><span>                                },</span></span>
<span class="line"><span>                            });</span></span>
<span class="line"><span>                        });</span></span>
<span class="line"><span>                        resolve(retryRequest);</span></span>
<span class="line"><span>                    } else {</span></span>
<span class="line"><span>                        reject(res);</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                fail: (err) =&gt; {</span></span>
<span class="line"><span>                    reject(err);</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>            ... 同上</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>至此，我们的 request.js 就封装完毕了</p><h2 id="二-使用" tabindex="-1">二.使用 <a class="header-anchor" href="#二-使用" aria-label="Permalink to &quot;二.使用&quot;">​</a></h2><p>引入和导出一些白名单之类的东东</p><pre><code>export const baseUrl = &quot;https://baseUrl.com/&quot;;
export const whiteList = [\`\${baseUrl}api/xxx/xxx\`, \`\${baseUrl}api/yyy/yyy\`];
import { apiRequest } from &quot;./request&quot;;
</code></pre><p>正常请求</p><div class="language-get vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">get</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const getxyz = (x = &quot;&quot;, y = &quot;&quot;, x = 1000) =&gt;</span></span>
<span class="line"><span>    apiRequest({</span></span>
<span class="line"><span>        url: \`\${baseUrl}api/getxyz/getxyz?x=\${x}&amp;y=\${y}&amp;z=\${z}\`,</span></span>
<span class="line"><span>    });</span></span></code></pre></div><div class="language-post vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">post</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const postxyz = (x, y, z) =&gt;</span></span>
<span class="line"><span>    apiRequest({</span></span>
<span class="line"><span>        url: \`\${baseUrl}api/postxyz/postxyz\`,</span></span>
<span class="line"><span>        method: &quot;POST&quot;,</span></span>
<span class="line"><span>        data: {</span></span>
<span class="line"><span>            x,</span></span>
<span class="line"><span>            y,</span></span>
<span class="line"><span>            z</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>    });</span></span></code></pre></div><p>上传接口</p><pre><code>const uploadImage = (zzz, filePath) =&gt;
    apiRequest({
        url: \`\${baseUrl}api/Upload/xxx/yyy/\${zzz}\`,
        filePath: filePath,
    });
</code></pre><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>至此，封装及使用都完成了，主要封装了双 token 的无感刷新，及与上传文件接口的统一，后续一些其他的操作可以再自行加入... 最后，阿 lin 祝大家都能找到好的工作(涨薪)啦 😊</p>`,35),t=[l];function i(c,o,r,u,d,h){return a(),n("div",null,t)}const k=s(p,[["render",i]]);export{g as __pageData,k as default};
