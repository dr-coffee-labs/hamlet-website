/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
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
define("ace/mode/c9search",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/c9search_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/c9search"],function(e,t){var n=e("../lib/oop"),i=e("./text").Mode,o=e("../tokenizer").Tokenizer,r=e("./c9search_highlight_rules").C9SearchHighlightRules,c=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("./folding/c9search").FoldMode,h=function(){this.$tokenizer=new o((new r).getRules()),this.$outdent=new c,this.foldingRules=new a};n.inherits(h,i),function(){this.getNextLineIndent=function(e,t){var n=this.$getIndent(t);return n},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)}}.call(h.prototype),t.Mode=h}),define("ace/mode/c9search_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:["c9searchresults.constant.numeric","c9searchresults.text","c9searchresults.text"],regex:"(^\\s+[0-9]+)(:\\s*)(.+)"},{token:["string","text"],regex:"(.+)(:$)"}]}};n.inherits(o,i),t.C9SearchHighlightRules=o}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var i=e.getLine(t),o=i.match(/^(\s*\})/);if(!o)return 0;var r=o[1].length,c=e.findMatchingBracket({row:t,column:r});if(!c||c.row==t)return 0;var a=this.$getIndent(e.getLine(c.row));e.replace(new n(t,0,t,r-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i}),define("ace/mode/folding/c9search",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),i=e("../../range").Range,o=e("./fold_mode").FoldMode,r=t.FoldMode=function(){};n.inherits(r,o),function(){this.foldingStartMarker=/^(\S.*\:|Searching for.*)$/,this.foldingStopMarker=/^(\s+|Found.*)$/,this.getFoldWidgetRange=function(e,t,n){var o=e.doc.getAllLines(n),r=o[n],c=/^(Found.*|Searching for.*)$/,a=/^(\S.*\:|\s*)$/,h=c.test(r)?c:a;if(this.foldingStartMarker.test(r)){for(var s=n+1,u=e.getLength();u>s&&!h.test(o[s]);s++);return new i(n,r.length,s,0)}if(this.foldingStopMarker.test(r)){for(var s=n-1;s>=0&&(r=o[s],!h.test(r));s--);return new i(s,r.length,n,0)}}}.call(r.prototype)});