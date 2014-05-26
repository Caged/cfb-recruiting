(function(){var e;e=function(e,t){var n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L;if(d3.select("#county-map svg").node())return;d=null,v=d3.tip().attr("class","d3-tip").html(function(e){return"<span class='name'>"+e.team+"</span> -        <span>"+e.city+", "+e.state+"</span>"}),m=d3.tip().attr("class","d3-tip-recruit").html(function(e){return"<span class='name'>"+e.name+"</span>:        <span class='star"+e.stars+"'>"+e.stars+"&#9733;</span> "+e.weight+"lb        "+e.position.toUpperCase()+" from <span>"+e.location+"</span>        in "+e.year}),r=function(e){var t,n,r,i,s;return i=e[0],s=e[1],n=s[0]-i[0],r=s[1]-i[1],t=Math.sqrt(n*n+r*r),"M"+i[0]+","+i[1]+"A"+t+","+t+" 0 0,1 "+s[0]+","+s[1]},l=d3.select("#county-map").append("svg").attr("width",t.width).attr("height",t.height).call(v).call(m),w=l.append("g"),E=function(){return w.selectAll(".counties").style("stroke-width",.5/d3.event.scale+"px"),w.selectAll(".states").style("stroke-width",.5/d3.event.scale+"px"),w.attr("transform","translate("+d3.event.translate+")scale("+d3.event.scale+")")},h=function(){return w.transition().duration(750).call(b.translate([0,0]).scale(1).event)},b=d3.behavior.zoom().translate([0,0]).scale(1).scaleExtent([1,8]).on("zoom",E),w.call(b).call(b.event),C=t.recruits;for(S=0,T=C.length;S<T;S++)c=C[S],c.coordinates=t.projection([c.lat,c.lon]);k=t.schools;for(x=0,N=k.length;x<N;x++)p=k[x],p.coordinates=t.projection([p.lat,p.lon]);return y=function(e){var t,n,r,i;return r=e.properties,t=d3.select(".js-county-info").style("display","block"),n=t.append("div").attr("class","js-county").datum(r),n.append("span").attr("class","title").text(function(e){return""+e.name.replace("County","")}),r.male_18_24?(i=n.append("ul").attr("class","star-recruits").selectAll("li").data(function(e){var t,n,r,s;i=[],s=["five","four","three","two"];for(n=0,r=s.length;n<r;n++)t=s[n],i.push({label:t,count:e[""+t+"_star"]});return i}).enter().append("li"),i.append("span").attr("class",function(e){return"star "+e.label}).html("&#9733;"),i.append("span").attr("class","count").text(function(e){return e.count}),n.append("span").attr("class","cam").html(function(e){return"<span class='count'>"+d3.format(",")(e.male_18_24)+"</span>            males 18-24yo according to The U.S. Census Bureau."}),n.append("span").attr("class","note").text("Recruit numbers based on 2002-2013 combined totals.               Demographics from 2008-12 5 year American Community Survey.")):n.append("span").attr("class","no-recruits").html("No 2-5&#9733; recruits")},i=function(e){return d3.select(".js-county-info").style("display","none"),d3.select(".js-county").remove()},f=function(e,n){return e.points=[t.projection([n.lat,n.lon]),t.projection([e.lat,e.lon])],e},u=function(e,t,n,r,i){var s,o,u,a,f,l;l="",s=Math.PI/n,a=0;while(a<2*n)f=(a&1)===0?i:r,o=e+Math.cos(a*s)*f,u=t+Math.sin(a*s)*f,a===0?l=""+o+","+u:l+=","+o+","+u,a++;return l},o=function(e){var n,i,s,o,u,a;e=e||d;if(!e)return;return a=$(".js-year").val(),u=t.recruits.filter(function(t){var n,r;return n=(r=t.institution)===e.team||r===e.alt,a?n&&t.year===a:n}),s=u.map(function(t){return f(t,e)}),u.sort(function(e,t){return d3.ascending(parseFloat(e.stars),parseFloat(t.stars))}),s.sort(function(e,t){return d3.ascending(parseFloat(e.stars),parseFloat(t.stars))}),i=u.length,n=w.selectAll(".connection").data(s,function(e){return""+e.name+":"+e.school}),n.enter().append("path").attr("d",function(e){return r(e.points)}).attr("class",function(e){return"connection stars"+e.stars}).style("stroke",function(e){return console.log(e),t.colors[e.stars-1]}).attr("stroke-dasharray",function(){var e;return e=this.getTotalLength(),""+e+","+e}).attr("stroke-dashoffset",function(){return this.getTotalLength()}).transition().duration(100).delay(function(e,t){return t/i*200}).attr("stroke-dashoffset",0),n.exit().remove(),o=w.selectAll(".recruit").data(u,function(e){return e.id}),o.enter().append("circle").attr("cx",function(e){return e.coordinates[0]}).attr("cy",function(e){return e.coordinates[1]}).attr("r",0).style("fill","#fff").attr("class","recruit").on("mouseover",m.show).on("mouseout",m.hide).transition().delay(function(e,t){return t/i*200}).duration(200).style("fill",function(e){return t.colors[e.stars-1]}).attr("r",3),o.exit().remove(),d=e,l.on("click",function(){if(d3.event.target.tagName==="svg")return n.remove(),o.remove()})},t.fill.domain([.2,d3.max(t.counties.features,function(e){return e.properties.total})]),l.append("text").attr("class","ui-info").attr("x",t.width/2).attr("y",25).text("Select school to see recruit locations"),w.append("g").attr("class","counties").selectAll("path.county").data(t.counties.features).enter().append("path").attr("class","county").style("fill",function(e){return t.fill(e.properties.total||0)}).attr("d",t.path).on("mouseover",y).on("mouseout",i).on("click",h),w.append("path").datum(t.states).attr("class","states").attr("d",t.path),w.append("path").datum(t.nation).attr("class","nation").attr("d",t.path),w.selectAll(".schools").data(t.schools).enter().append("polygon").attr("class",function(e){return"school "+e.team.toLowerCase().replace(/\s+/,"-")}).attr("points",function(e){return u(e.coordinates[0],e.coordinates[1],5,6,3)}).on("mouseover",v.show).on("mouseout",v.hide).on("click",o),n=w.select(".syracuse").datum(),L=t.projection([+n.lat,+n.lon]),a=L[0],g=L[1],g=Math.max(g-200,parseFloat(d3.select("header.no-height").style("height"))+10),d3.select(".js-spurrier").style({display:"block",top:""+g+"px",left:""+(a-200)+"px"}),s=function(e){var n;return e=e?"total_"+e:"total",n=t.counties.features.length,t.fill.domain([.2,d3.max(t.counties.features,function(t){return t.properties[e]})]),w.selectAll(".county").transition().delay(function(e,t){return t/n*500}).style("fill",function(n){return t.fill(n.properties[e]||0)}).style("stroke",function(n){var r;return r=n.properties[e]||0,r>0?t.fill(r||0):"#333"})},$(".js-year").on("change",function(){var e;return e=$(this).val(),s(e),o()})},$(document).on("data.loaded",e)}).call(this);