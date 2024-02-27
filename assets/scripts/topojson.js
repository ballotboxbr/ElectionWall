!function(r,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(r.topojson=r.topojson||{})}(this,function(r){"use strict";var n=function(r){return r},t=function(r){if(null==r)return n;var t,e,o=r.scale[0],a=r.scale[1],i=r.translate[0],u=r.translate[1];return function(r,n){n||(t=e=0);var c=2,f=r.length,s=new Array(f);for(s[0]=(t+=r[0])*o+i,s[1]=(e+=r[1])*a+u;c<f;)s[c]=r[c],++c;return s}},e=function(r){var n,e=t(r.transform),o=1/0,a=o,i=-o,u=-o;function c(r){(r=e(r))[0]<o&&(o=r[0]),r[0]>i&&(i=r[0]),r[1]<a&&(a=r[1]),r[1]>u&&(u=r[1])}function f(r){switch(r.type){case"GeometryCollection":r.geometries.forEach(f);break;case"Point":c(r.coordinates);break;case"MultiPoint":r.coordinates.forEach(c)}}for(n in r.arcs.forEach(function(r){for(var n,t=-1,c=r.length;++t<c;)(n=e(r[t],t))[0]<o&&(o=n[0]),n[0]>i&&(i=n[0]),n[1]<a&&(a=n[1]),n[1]>u&&(u=n[1])}),r.objects)f(r.objects[n]);return[o,a,i,u]},o=function(r,n){for(var t,e=r.length,o=e-n;o<--e;)t=r[o],r[o++]=r[e],r[e]=t},a=function(r,n){return"GeometryCollection"===n.type?{type:"FeatureCollection",features:n.geometries.map(function(n){return i(r,n)})}:i(r,n)};function i(r,n){var t=n.id,e=n.bbox,o=null==n.properties?{}:n.properties,a=u(r,n);return null==t&&null==e?{type:"Feature",properties:o,geometry:a}:null==e?{type:"Feature",id:t,properties:o,geometry:a}:{type:"Feature",id:t,bbox:e,properties:o,geometry:a}}function u(r,n){var e=t(r.transform),a=r.arcs;function i(r,n){n.length&&n.pop();for(var t=a[r<0?~r:r],i=0,u=t.length;i<u;++i)n.push(e(t[i],i));r<0&&o(n,u)}function u(r){return e(r)}function c(r){for(var n=[],t=0,e=r.length;t<e;++t)i(r[t],n);return n.length<2&&n.push(n[0]),n}function f(r){for(var n=c(r);n.length<4;)n.push(n[0]);return n}function s(r){return r.map(f)}return function r(n){var t,e=n.type;switch(e){case"GeometryCollection":return{type:e,geometries:n.geometries.map(r)};case"Point":t=u(n.coordinates);break;case"MultiPoint":t=n.coordinates.map(u);break;case"LineString":t=c(n.arcs);break;case"MultiLineString":t=n.arcs.map(c);break;case"Polygon":t=s(n.arcs);break;case"MultiPolygon":t=n.arcs.map(s);break;default:return null}return{type:e,coordinates:t}}(n)}var c=function(r,n){var t={},e={},o={},a=[],i=-1;function u(r,n){for(var e in r){var o=r[e];delete n[o.start],delete o.start,delete o.end,o.forEach(function(r){t[r<0?~r:r]=1}),a.push(o)}}return n.forEach(function(t,e){var o,a=r.arcs[t<0?~t:t];a.length<3&&!a[1][0]&&!a[1][1]&&(o=n[++i],n[i]=t,n[e]=o)}),n.forEach(function(n){var t,a,i=function(n){var t,e=r.arcs[n<0?~n:n],o=e[0];r.transform?(t=[0,0],e.forEach(function(r){t[0]+=r[0],t[1]+=r[1]})):t=e[e.length-1];return n<0?[t,o]:[o,t]}(n),u=i[0],c=i[1];if(t=o[u])if(delete o[t.end],t.push(n),t.end=c,a=e[c]){delete e[a.start];var f=a===t?t:t.concat(a);e[f.start=t.start]=o[f.end=a.end]=f}else e[t.start]=o[t.end]=t;else if(t=e[c])if(delete e[t.start],t.unshift(n),t.start=u,a=o[u]){delete o[a.end];var s=a===t?t:a.concat(t);e[s.start=a.start]=o[s.end=t.end]=s}else e[t.start]=o[t.end]=t;else e[(t=[n]).start=u]=o[t.end=c]=t}),u(o,e),u(e,o),n.forEach(function(r){t[r<0?~r:r]||a.push([r])}),a};function f(r,n,t){var e,o,a;if(arguments.length>1)e=function(r,n,t){var e,o=[],a=[];function i(r){var n=r<0?~r:r;(a[n]||(a[n]=[])).push({i:r,g:e})}function u(r){r.forEach(i)}function c(r){r.forEach(u)}return function r(n){switch(e=n,n.type){case"GeometryCollection":n.geometries.forEach(r);break;case"LineString":u(n.arcs);break;case"MultiLineString":case"Polygon":c(n.arcs);break;case"MultiPolygon":n.arcs.forEach(c)}}(n),a.forEach(null==t?function(r){o.push(r[0].i)}:function(r){t(r[0].g,r[r.length-1].g)&&o.push(r[0].i)}),o}(0,n,t);else for(o=0,e=new Array(a=r.arcs.length);o<a;++o)e[o]=o;return{type:"MultiLineString",arcs:c(r,e)}}function s(r,n){var t={},e=[],o=[];function a(r){r.forEach(function(n){n.forEach(function(n){(t[n=n<0?~n:n]||(t[n]=[])).push(r)})}),e.push(r)}function i(n){return function(r){for(var n,t=-1,e=r.length,o=r[e-1],a=0;++t<e;)n=o,o=r[t],a+=n[0]*o[1]-n[1]*o[0];return Math.abs(a)}(u(r,{type:"Polygon",arcs:[n]}).coordinates[0])}return n.forEach(function r(n){switch(n.type){case"GeometryCollection":n.geometries.forEach(r);break;case"Polygon":a(n.arcs);break;case"MultiPolygon":n.arcs.forEach(a)}}),e.forEach(function(r){if(!r._){var n=[],e=[r];for(r._=1,o.push(n);r=e.pop();)n.push(r),r.forEach(function(r){r.forEach(function(r){t[r<0?~r:r].forEach(function(r){r._||(r._=1,e.push(r))})})})}}),e.forEach(function(r){delete r._}),{type:"MultiPolygon",arcs:o.map(function(n){var e,o=[];if(n.forEach(function(r){r.forEach(function(r){r.forEach(function(r){t[r<0?~r:r].length<2&&o.push(r)})})}),(e=(o=c(r,o)).length)>1)for(var a,u,f=1,s=i(o[0]);f<e;++f)(a=i(o[f]))>s&&(u=o[0],o[0]=o[f],o[f]=u,s=a);return o})}}var l=function(r,n){for(var t=0,e=r.length;t<e;){var o=t+e>>>1;r[o]<n?t=o+1:e=o}return t},h=function(r){if(null==r)return n;var t,e,o=r.scale[0],a=r.scale[1],i=r.translate[0],u=r.translate[1];return function(r,n){n||(t=e=0);var c=2,f=r.length,s=new Array(f),l=Math.round((r[0]-i)/o),h=Math.round((r[1]-u)/a);for(s[0]=l-t,t=l,s[1]=h-e,e=h;c<f;)s[c]=r[c],++c;return s}},p=function(r,n,t,e,o,a){3===arguments.length&&(e=a=Array,o=null);for(var i=new e(r=1<<Math.max(4,Math.ceil(Math.log(r)/Math.LN2))),u=new a(r),c=r-1,f=0;f<r;++f)i[f]=o;return{set:function(e,a){for(var f=n(e)&c,s=i[f],l=0;s!=o;){if(t(s,e))return u[f]=a;if(++l>=r)throw new Error("full hashmap");s=i[f=f+1&c]}return i[f]=e,u[f]=a,a},maybeSet:function(e,a){for(var f=n(e)&c,s=i[f],l=0;s!=o;){if(t(s,e))return u[f];if(++l>=r)throw new Error("full hashmap");s=i[f=f+1&c]}return i[f]=e,u[f]=a,a},get:function(e,a){for(var f=n(e)&c,s=i[f],l=0;s!=o;){if(t(s,e))return u[f];if(++l>=r)break;s=i[f=f+1&c]}return a},keys:function(){for(var r=[],n=0,t=i.length;n<t;++n){var e=i[n];e!=o&&r.push(e)}return r}}},g=function(r,n){return r[0]===n[0]&&r[1]===n[1]},y=new ArrayBuffer(16),v=new Uint32Array(y),b=function(r){var n=v[0]^v[1];return 2147483647&(n=n<<5^n>>7^v[2]^v[3])},m=function(r){var n,t,e,o,a=r.coordinates,i=r.lines,u=r.rings,c=function(){for(var r=p(1.4*a.length,w,k,Int32Array,-1,Int32Array),n=new Int32Array(a.length),t=0,e=a.length;t<e;++t)n[t]=r.maybeSet(t,t);return n}(),f=new Int32Array(a.length),s=new Int32Array(a.length),l=new Int32Array(a.length),h=new Int8Array(a.length),y=0;for(n=0,t=a.length;n<t;++n)f[n]=s[n]=l[n]=-1;for(n=0,t=i.length;n<t;++n){var v=i[n],m=v[0],d=v[1];for(e=c[m],o=c[++m],++y,h[e]=1;++m<=d;)x(n,e,e=o,o=c[m]);++y,h[o]=1}for(n=0,t=a.length;n<t;++n)f[n]=-1;for(n=0,t=u.length;n<t;++n){var M=u[n],E=M[0]+1,P=M[1];for(x(n,c[P-1],e=c[E-1],o=c[E]);++E<=P;)x(n,e,e=o,o=c[E])}function x(r,n,t,e){if(f[t]!==r){f[t]=r;var o=s[t];if(o>=0){var a=l[t];o===n&&a===e||o===e&&a===n||(++y,h[t]=1)}else s[t]=n,l[t]=e}}function w(r){return b(a[r])}function k(r,n){return g(a[r],a[n])}f=s=l=null;var A,L=function(r,n,t,e,o){3===arguments.length&&(e=Array,o=null);for(var a=new e(r=1<<Math.max(4,Math.ceil(Math.log(r)/Math.LN2))),i=r-1,u=0;u<r;++u)a[u]=o;return{add:function(e){for(var u=n(e)&i,c=a[u],f=0;c!=o;){if(t(c,e))return!0;if(++f>=r)throw new Error("full hashset");c=a[u=u+1&i]}return a[u]=e,!0},has:function(e){for(var u=n(e)&i,c=a[u],f=0;c!=o;){if(t(c,e))return!0;if(++f>=r)break;c=a[u=u+1&i]}return!1},values:function(){for(var r=[],n=0,t=a.length;n<t;++n){var e=a[n];e!=o&&r.push(e)}return r}}}(1.4*y,b,g);for(n=0,t=a.length;n<t;++n)h[A=c[n]]&&L.add(a[A]);return L};function d(r,n,t){for(var e,o=n+(t---n>>1);n<o;++n,--t)e=r[n],r[n]=r[t],r[t]=e}function M(r){var n,t=E(r.geometry);for(n in null!=r.id&&(t.id=r.id),null!=r.bbox&&(t.bbox=r.bbox),r.properties){t.properties=r.properties;break}return t}function E(r){if(null==r)return{type:null};var n="GeometryCollection"===r.type?{type:"GeometryCollection",geometries:r.geometries.map(E)}:"Point"===r.type||"MultiPoint"===r.type?{type:r.type,coordinates:r.coordinates}:{type:r.type,arcs:r.coordinates};return null!=r.bbox&&(n.bbox=r.bbox),n}function P(r){var n,t=r[0],e=r[1];return e<t&&(n=t,t=e,e=n),t+31*e}function x(r,n){var t,e=r[0],o=r[1],a=n[0],i=n[1];return o<e&&(t=e,e=o,o=t),i<a&&(t=a,a=i,i=t),e===a&&o===i}function w(){return!0}function k(r){return r}function A(r){return null!=r.type}var L=function(r){var n,t=new Array(r.arcs.length),e=0;function o(r){switch(r.type){case"GeometryCollection":r.geometries.forEach(o);break;case"Polygon":a(r.arcs);break;case"MultiPolygon":r.arcs.forEach(a)}}function a(r){for(var n=0,o=r.length;n<o;++n,++e)for(var a=r[n],i=0,u=a.length;i<u;++i){var c=a[i];c<0&&(c=~c);var f=t[c];null==f?t[c]=e:f!==e&&(t[c]=-1)}}for(n in r.objects)o(r.objects[n]);return function(r){for(var n,e=0,o=r.length;e<o;++e)if(-1===t[(n=r[e])<0?~n:n])return!0;return!1}};function C(r){var n=r[0],t=r[1],e=r[2];return Math.abs((n[0]-e[0])*(t[1]-n[1])-(n[0]-t[0])*(e[1]-n[1]))/2}function S(r){for(var n,t=-1,e=r.length,o=r[e-1],a=0;++t<e;)n=o,o=r[t],a+=n[0]*o[1]-n[1]*o[0];return Math.abs(a)/2}var G=function(r,n,t){return n=null==n?Number.MIN_VALUE:+n,null==t&&(t=S),function(e,o){return t(a(r,{type:"Polygon",arcs:[e]}).geometry.coordinates[0],o)>=n}};function j(r,n){return r[1][2]-n[1][2]}function _(r){return[r[0],r[1],0]}function I(r,n){return n-r}var T=Math.PI,F=2*T,N=T/4,O=T/180,q=Math.abs,U=Math.atan2,z=Math.cos,R=Math.sin;function V(r,n){for(var t,e,o=0,a=r.length,i=0,u=r[n?o++:a-1],c=u[0]*O,f=u[1]*O/2+N,s=z(f),l=R(f);o<a;++o){t=c,c=(u=r[o])[0]*O,f=u[1]*O/2+N,e=s,s=z(f);var h=c-t,p=h>=0?1:-1,g=p*h,y=l*(l=R(f)),v=e*s+y*z(g),b=y*p*R(g);i+=U(b,v)}return i}r.bbox=e,r.feature=a,r.mesh=function(r){return u(r,f.apply(this,arguments))},r.meshArcs=f,r.merge=function(r){return u(r,s.apply(this,arguments))},r.mergeArcs=s,r.neighbors=function(r){var n={},t=r.map(function(){return[]});function e(r,t){r.forEach(function(r){r<0&&(r=~r);var e=n[r];e?e.push(t):n[r]=[t]})}function o(r,n){r.forEach(function(r){e(r,n)})}var a={LineString:e,MultiLineString:o,Polygon:o,MultiPolygon:function(r,n){r.forEach(function(r){o(r,n)})}};for(var i in r.forEach(function r(n,t){"GeometryCollection"===n.type?n.geometries.forEach(function(n){r(n,t)}):n.type in a&&a[n.type](n.arcs,t)}),n)for(var u=n[i],c=u.length,f=0;f<c;++f)for(var s=f+1;s<c;++s){var h,p=u[f],g=u[s];(h=t[p])[i=l(h,g)]!==g&&h.splice(i,0,g),(h=t[g])[i=l(h,p)]!==p&&h.splice(i,0,p)}return t},r.quantize=function(r,n){if(r.transform)throw new Error("already quantized");if(n&&n.scale)c=r.bbox;else{if(!((t=Math.floor(n))>=2))throw new Error("n must be ≥2");var t,o=(c=r.bbox||e(r))[0],a=c[1],i=c[2],u=c[3];n={scale:[i-o?(i-o)/(t-1):1,u-a?(u-a)/(t-1):1],translate:[o,a]}}var c,f,s=h(n),l=r.objects,p={};function g(r){return s(r)}function y(r){var n;switch(r.type){case"GeometryCollection":n={type:"GeometryCollection",geometries:r.geometries.map(y)};break;case"Point":n={type:"Point",coordinates:g(r.coordinates)};break;case"MultiPoint":n={type:"MultiPoint",coordinates:r.coordinates.map(g)};break;default:return r}return null!=r.id&&(n.id=r.id),null!=r.bbox&&(n.bbox=r.bbox),null!=r.properties&&(n.properties=r.properties),n}for(f in l)p[f]=y(l[f]);return{type:"Topology",bbox:c,transform:n,objects:p,arcs:r.arcs.map(function(r){var n,t=0,e=1,o=r.length,a=new Array(o);for(a[0]=s(r[0],0);++t<o;)((n=s(r[t],t))[0]||n[1])&&(a[e++]=n);return 1===e&&(a[e++]=[0,0]),a.length=e,a})}},r.transform=t,r.untransform=h,r.topology=function(r,n){var t=function(r){var n=1/0,t=1/0,e=-1/0,o=-1/0;function a(r){null!=r&&i.hasOwnProperty(r.type)&&i[r.type](r)}var i={GeometryCollection:function(r){r.geometries.forEach(a)},Point:function(r){u(r.coordinates)},MultiPoint:function(r){r.coordinates.forEach(u)},LineString:function(r){c(r.arcs)},MultiLineString:function(r){r.arcs.forEach(c)},Polygon:function(r){r.arcs.forEach(c)},MultiPolygon:function(r){r.arcs.forEach(f)}};function u(r){var a=r[0],i=r[1];a<n&&(n=a),a>e&&(e=a),i<t&&(t=i),i>o&&(o=i)}function c(r){r.forEach(u)}function f(r){r.forEach(c)}for(var s in r)a(r[s]);return e>=n&&o>=t?[n,t,e,o]:void 0}(r=function(r){var n,t,e={};for(n in r)e[n]=null==(t=r[n])?{type:null}:("FeatureCollection"===t.type?function(r){var n={type:"GeometryCollection",geometries:r.features.map(M)};return null!=r.bbox&&(n.bbox=r.bbox),n}:"Feature"===t.type?M:E)(t);return e}(r)),e=n>0&&t&&function(r,n,t){var e=n[0],o=n[1],a=n[2],i=n[3],u=a-e?(t-1)/(a-e):1,c=i-o?(t-1)/(i-o):1;function f(r){return[Math.round((r[0]-e)*u),Math.round((r[1]-o)*c)]}function s(r,n){for(var t,a,i,f,s,l=-1,h=0,p=r.length,g=new Array(p);++l<p;)t=r[l],f=Math.round((t[0]-e)*u),s=Math.round((t[1]-o)*c),f===a&&s===i||(g[h++]=[a=f,i=s]);for(g.length=h;h<n;)h=g.push([g[0][0],g[0][1]]);return g}function l(r){return s(r,2)}function h(r){return s(r,4)}function p(r){return r.map(h)}function g(r){null!=r&&y.hasOwnProperty(r.type)&&y[r.type](r)}var y={GeometryCollection:function(r){r.geometries.forEach(g)},Point:function(r){r.coordinates=f(r.coordinates)},MultiPoint:function(r){r.coordinates=r.coordinates.map(f)},LineString:function(r){r.arcs=l(r.arcs)},MultiLineString:function(r){r.arcs=r.arcs.map(l)},Polygon:function(r){r.arcs=p(r.arcs)},MultiPolygon:function(r){r.arcs=r.arcs.map(p)}};for(var v in r)g(r[v]);return{scale:[1/u,1/c],translate:[e,o]}}(r,t,n),o=function(r){var n,t,e,o,a=r.coordinates,i=r.lines,u=r.rings,c=i.length+u.length;for(delete r.lines,delete r.rings,e=0,o=i.length;e<o;++e)for(n=i[e];n=n.next;)++c;for(e=0,o=u.length;e<o;++e)for(t=u[e];t=t.next;)++c;var f=p(2*c*1.4,b,g),s=r.arcs=[];for(e=0,o=i.length;e<o;++e){n=i[e];do{l(n)}while(n=n.next)}for(e=0,o=u.length;e<o;++e)if((t=u[e]).next)do{l(t)}while(t=t.next);else h(t);function l(r){var n,t,e,o,i,u,c,l;if(e=f.get(n=a[r[0]]))for(c=0,l=e.length;c<l;++c)if(y(o=e[c],r))return r[0]=o[0],void(r[1]=o[1]);if(i=f.get(t=a[r[1]]))for(c=0,l=i.length;c<l;++c)if(v(u=i[c],r))return r[1]=u[0],void(r[0]=u[1]);e?e.push(r):f.set(n,[r]),i?i.push(r):f.set(t,[r]),s.push(r)}function h(r){var n,t,e,o,i;if(t=f.get(a[r[0]]))for(o=0,i=t.length;o<i;++o){if(m(e=t[o],r))return r[0]=e[0],void(r[1]=e[1]);if(d(e,r))return r[0]=e[1],void(r[1]=e[0])}if(t=f.get(n=a[r[0]+M(r)]))for(o=0,i=t.length;o<i;++o){if(m(e=t[o],r))return r[0]=e[0],void(r[1]=e[1]);if(d(e,r))return r[0]=e[1],void(r[1]=e[0])}t?t.push(r):f.set(n,[r]),s.push(r)}function y(r,n){var t=r[0],e=n[0],o=r[1];if(t-o!=e-n[1])return!1;for(;t<=o;++t,++e)if(!g(a[t],a[e]))return!1;return!0}function v(r,n){var t=r[0],e=n[0],o=r[1],i=n[1];if(t-o!=e-i)return!1;for(;t<=o;++t,--i)if(!g(a[t],a[i]))return!1;return!0}function m(r,n){var t=r[0],e=n[0],o=r[1]-t;if(o!==n[1]-e)return!1;for(var i=M(r),u=M(n),c=0;c<o;++c)if(!g(a[t+(c+i)%o],a[e+(c+u)%o]))return!1;return!0}function d(r,n){var t=r[0],e=n[0],o=r[1],i=n[1],u=o-t;if(u!==i-e)return!1;for(var c=M(r),f=u-M(n),s=0;s<u;++s)if(!g(a[t+(s+c)%u],a[i-(s+f)%u]))return!1;return!0}function M(r){for(var n=r[0],t=r[1],e=n,o=e,i=a[e];++e<t;){var u=a[e];(u[0]<i[0]||u[0]===i[0]&&u[1]<i[1])&&(o=e,i=u)}return o-n}return r}(function(r){var n,t,e,o,a,i,u,c=m(r),f=r.coordinates,s=r.lines,l=r.rings;for(t=0,e=s.length;t<e;++t)for(var h=s[t],p=h[0],g=h[1];++p<g;)c.has(f[p])&&(n={0:p,1:h[1]},h[1]=p,h=h.next=n);for(t=0,e=l.length;t<e;++t)for(var y=l[t],v=y[0],b=v,M=y[1],E=c.has(f[v]);++b<M;)c.has(f[b])&&(E?(n={0:b,1:y[1]},y[1]=b,y=y.next=n):(u=M-b,d(o=f,a=v,i=M),d(o,a,a+u),d(o,a+u,i),f[M]=f[v],E=!0,b=v));return r}(function(r){var n=-1,t=[],e=[],o=[];function a(r){r&&i.hasOwnProperty(r.type)&&i[r.type](r)}var i={GeometryCollection:function(r){r.geometries.forEach(a)},LineString:function(r){r.arcs=u(r.arcs)},MultiLineString:function(r){r.arcs=r.arcs.map(u)},Polygon:function(r){r.arcs=r.arcs.map(c)},MultiPolygon:function(r){r.arcs=r.arcs.map(f)}};function u(r){for(var e=0,a=r.length;e<a;++e)o[++n]=r[e];var i={0:n-a+1,1:n};return t.push(i),i}function c(r){for(var t=0,a=r.length;t<a;++t)o[++n]=r[t];var i={0:n-a+1,1:n};return e.push(i),i}function f(r){return r.map(c)}for(var s in r)a(r[s]);return{type:"Topology",coordinates:o,lines:t,rings:e,objects:r}}(r))),a=o.coordinates,i=p(1.4*o.arcs.length,P,x);function u(r){r&&c.hasOwnProperty(r.type)&&c[r.type](r)}r=o.objects,o.bbox=t,o.arcs=o.arcs.map(function(r,n){return i.set(r,n),a.slice(r[0],r[1]+1)}),delete o.coordinates,a=null;var c={GeometryCollection:function(r){r.geometries.forEach(u)},LineString:function(r){r.arcs=f(r.arcs)},MultiLineString:function(r){r.arcs=r.arcs.map(f)},Polygon:function(r){r.arcs=r.arcs.map(f)},MultiPolygon:function(r){r.arcs=r.arcs.map(s)}};function f(r){var n=[];do{var t=i.get(r);n.push(r[0]<r[1]?t:~t)}while(r=r.next);return n}function s(r){return r.map(f)}for(var l in r)u(r[l]);return e&&(o.transform=e,o.arcs=function(r){for(var n=-1,t=r.length;++n<t;){for(var e,o,a=r[n],i=0,u=1,c=a.length,f=a[0],s=f[0],l=f[1];++i<c;)e=(f=a[i])[0],o=f[1],e===s&&o===l||(a[u++]=[e-s,o-l],s=e,l=o);1===u&&(a[u++]=[0,0]),a.length=u}return r}(o.arcs)),o},r.filter=function(r,n){var t,e=r.objects,o={};function a(r){var n,t;switch(r.type){case"Polygon":n=(t=i(r.arcs))?{type:"Polygon",arcs:t}:{type:null};break;case"MultiPolygon":n=(t=r.arcs.map(i).filter(k)).length?{type:"MultiPolygon",arcs:t}:{type:null};break;case"GeometryCollection":n=(t=r.geometries.map(a).filter(A)).length?{type:"GeometryCollection",geometries:t}:{type:null};break;default:return r}return null!=r.id&&(n.id=r.id),null!=r.bbox&&(n.bbox=r.bbox),null!=r.properties&&(n.properties=r.properties),n}function i(r){return r.length&&(t=r[0],n(t,!1))?[r[0]].concat(r.slice(1).filter(u)):null;var t}function u(r){return n(r,!0)}for(t in null==n&&(n=w),e)o[t]=a(e[t]);return function(r){var n,t,e=r.objects,o={},a=r.arcs,i=a.length,u=-1,c=new Array(i),f=0,s=-1;function l(r){switch(r.type){case"GeometryCollection":r.geometries.forEach(l);break;case"LineString":p(r.arcs);break;case"MultiLineString":case"Polygon":r.arcs.forEach(p);break;case"MultiPolygon":r.arcs.forEach(g)}}function h(r){r<0&&(r=~r),c[r]||(c[r]=1,++f)}function p(r){r.forEach(h)}function g(r){r.forEach(p)}function y(r){var n;switch(r.type){case"GeometryCollection":n={type:"GeometryCollection",geometries:r.geometries.map(y)};break;case"LineString":n={type:"LineString",arcs:b(r.arcs)};break;case"MultiLineString":n={type:"MultiLineString",arcs:r.arcs.map(b)};break;case"Polygon":n={type:"Polygon",arcs:r.arcs.map(b)};break;case"MultiPolygon":n={type:"MultiPolygon",arcs:r.arcs.map(m)};break;default:return r}return null!=r.id&&(n.id=r.id),null!=r.bbox&&(n.bbox=r.bbox),null!=r.properties&&(n.properties=r.properties),n}function v(r){return r<0?~c[~r]:c[r]}function b(r){return r.map(v)}function m(r){return r.map(b)}for(t in e)l(e[t]);for(n=new Array(f);++u<i;)c[u]&&(c[u]=++s,n[s]=a[u]);for(t in e)o[t]=y(e[t]);return{type:"Topology",bbox:r.bbox,transform:r.transform,objects:o,arcs:n}}({type:"Topology",bbox:r.bbox,transform:r.transform,objects:o,arcs:r.arcs})},r.filterAttached=L,r.filterAttachedWeight=function(r,n,t){var e=L(r),o=G(r,n,t);return function(r,n){return e(r,n)||o(r,n)}},r.filterWeight=G,r.planarRingArea=S,r.planarTriangleArea=C,r.presimplify=function(r,n){var e=r.transform?t(r.transform):_,o=function(){var r={},n=[],t=0;function e(r,t){for(;t>0;){var e=(t+1>>1)-1,o=n[e];if(j(r,o)>=0)break;n[o._=t]=o,n[r._=t=e]=r}}function o(r,e){for(;;){var o=e+1<<1,a=o-1,i=e,u=n[i];if(a<t&&j(n[a],u)<0&&(u=n[i=a]),o<t&&j(n[o],u)<0&&(u=n[i=o]),i===e)break;n[u._=e]=u,n[r._=e=i]=r}}return r.push=function(r){return e(n[r._=t]=r,t++),t},r.pop=function(){if(!(t<=0)){var r,e=n[0];return--t>0&&(r=n[t],o(n[r._=0]=r,0)),e}},r.remove=function(r){var a,i=r._;if(n[i]===r)return i!==--t&&(j(a=n[t],r)<0?e:o)(n[a._=i]=a,i),i},r}();null==n&&(n=C);var a=r.arcs.map(function(r){var t,a,u,c=[],f=0;for(a=1,u=(r=r.map(e)).length-1;a<u;++a)(t=[r[a-1],r[a],r[a+1]])[1][2]=n(t),c.push(t),o.push(t);for(r[0][2]=r[u][2]=1/0,a=0,u=c.length;a<u;++a)(t=c[a]).previous=c[a-1],t.next=c[a+1];for(;t=o.pop();){var s=t.previous,l=t.next;t[1][2]<f?t[1][2]=f:f=t[1][2],s&&(s.next=l,s[2]=t[2],i(s)),l&&(l.previous=s,l[0]=t[0],i(l))}return r});function i(r){o.remove(r),r[1][2]=n(r),o.push(r)}return{type:"Topology",bbox:r.bbox,objects:r.objects,arcs:a}},r.quantile=function(r,n){var t=[];return r.arcs.forEach(function(r){r.forEach(function(r){isFinite(r[2])&&t.push(r[2])})}),t.length&&function(r,n){if(t=r.length){if((n=+n)<=0||t<2)return r[0];if(n>=1)return r[t-1];var t,e=(t-1)*n,o=Math.floor(e),a=r[o],i=r[o+1];return a+(i-a)*(e-o)}}(t.sort(I),n)},r.simplify=function(r,n){n=null==n?Number.MIN_VALUE:+n;var t=r.arcs.map(function(r){for(var t,e=-1,o=0,a=r.length,i=new Array(a);++e<a;)(t=r[e])[2]>=n&&(i[o++]=[t[0],t[1]]);return i.length=o,i});return{type:"Topology",transform:r.transform,bbox:r.bbox,objects:r.objects,arcs:t}},r.sphericalRingArea=function(r,n){var t=V(r,!0);return n&&(t*=-1),2*(t<0?F+t:t)},r.sphericalTriangleArea=function(r){return 2*q(V(r,!1))},Object.defineProperty(r,"__esModule",{value:!0})});