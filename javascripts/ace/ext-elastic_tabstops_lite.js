/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */
define("ace/ext/elastic_tabstops_lite",["require","exports","module","ace/editor","ace/config"],function(t,s){var e=function(t){this.$editor=t;var s=this,e=[],i=!1;this.onAfterExec=function(){i=!1,s.processRows(e),e=[]},this.onExec=function(){i=!0},this.onChange=function(t){var s=t.data.range;i&&(-1==e.indexOf(s.start.row)&&e.push(s.start.row),s.end.row!=s.start.row&&e.push(s.end.row))}};(function(){this.processRows=function(t){this.$inChange=!0;for(var s=[],e=0,i=t.length;i>e;e++){var o=t[e];if(!(s.indexOf(o)>-1))for(var n=this.$findCellWidthsForBlock(o),r=this.$setBlockCellWidthsToMax(n.cellWidths),h=n.firstRow,a=0,l=r.length;l>a;a++){var c=r[a];s.push(h),this.$adjustRow(h,c),h++}}this.$inChange=!1},this.$findCellWidthsForBlock=function(t){for(var s,e=[],i=t;i>=0&&(s=this.$cellWidthsForRow(i),0!=s.length);)e.unshift(s),i--;var o=i+1;i=t;for(var n=this.$editor.session.getLength();n-1>i&&(i++,s=this.$cellWidthsForRow(i),0!=s.length);)e.push(s);return{cellWidths:e,firstRow:o}},this.$cellWidthsForRow=function(t){for(var s=this.$selectionColumnsForRow(t),e=[-1].concat(this.$tabsForRow(t)),i=e.map(function(){return 0}).slice(1),o=this.$editor.session.getLine(t),n=0,r=e.length-1;r>n;n++){var h=e[n]+1,a=e[n+1],l=this.$rightmostSelectionInCell(s,a),c=o.substring(h,a);i[n]=Math.max(c.replace(/\s+$/g,"").length,l-h)}return i},this.$selectionColumnsForRow=function(t){var s=[],e=this.$editor.getCursorPosition();return this.$editor.session.getSelection().isEmpty()&&t==e.row&&s.push(e.column),s},this.$setBlockCellWidthsToMax=function(t){for(var s,e,i,o=!0,n=this.$izip_longest(t),r=0,h=n.length;h>r;r++){var a=n[r];if(a.push){a.push(0/0);for(var l=0,c=a.length;c>l;l++){var u=a[l];if(o&&(s=l,i=0,o=!1),isNaN(u)){e=l;for(var f=s;e>f;f++)t[f][r]=i;o=!0}i=Math.max(i,u)}}else console.error(a)}return t},this.$rightmostSelectionInCell=function(t,s){var e=0;if(t.length){for(var i=[],o=0,n=t.length;n>o;o++)i.push(t[o]<=s?o:0);e=Math.max.apply(Math,i)}return e},this.$tabsForRow=function(t){for(var s,e=[],i=this.$editor.session.getLine(t),o=/\t/g;null!=(s=o.exec(i));)e.push(s.index);return e},this.$adjustRow=function(t,s){var e=this.$tabsForRow(t);if(0!=e.length)for(var i=0,o=-1,n=this.$izip(s,e),r=0,h=n.length;h>r;r++){var a=n[r][0],l=n[r][1];o+=1+a,l+=i;var c=o-l;if(0!=c){var u=this.$editor.session.getLine(t).substr(0,l),f=u.replace(/\s*$/g,""),g=u.length-f.length;c>0&&(this.$editor.session.getDocument().insertInLine({row:t,column:l+1},Array(c+1).join(" ")+"	"),this.$editor.session.getDocument().removeInLine(t,l,l+1),i+=c),0>c&&g>=-c&&(this.$editor.session.getDocument().removeInLine(t,l+c,l),i+=c)}}},this.$izip_longest=function(t){if(!t[0])return[];for(var s=t[0].length,e=t.length,i=1;e>i;i++){var o=t[i].length;o>s&&(s=o)}for(var n=[],r=0;s>r;r++){for(var h=[],i=0;e>i;i++)h.push(""===t[i][r]?0/0:t[i][r]);n.push(h)}return n},this.$izip=function(t,s){for(var e=t.length>=s.length?s.length:t.length,i=[],o=0;e>o;o++){var n=[t[o],s[o]];i.push(n)}return i}}).call(e.prototype),s.ElasticTabstopsLite=e;var i=t("../editor").Editor;t("../config").defineOptions(i.prototype,"editor",{useElasticTabstops:{set:function(t){t?(this.elasticTabstops||(this.elasticTabstops=new e(this)),this.commands.on("afterExec",this.elasticTabstops.onAfterExec),this.commands.on("exec",this.elasticTabstops.onExec),this.on("change",this.elasticTabstops.onChange)):this.elasticTabstops&&(this.commands.removeListener("afterExec",this.elasticTabstops.onAfterExec),this.commands.removeListener("exec",this.elasticTabstops.onExec),this.removeListener("change",this.elasticTabstops.onChange))}}})});