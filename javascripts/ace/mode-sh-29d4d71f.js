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
define("ace/mode/sh",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/sh_highlight_rules","ace/range"],function(e,t){var n=e("../lib/oop"),i=e("./text").Mode,r=e("../tokenizer").Tokenizer,o=e("./sh_highlight_rules").ShHighlightRules,s=e("../range").Range,a=function(){this.$tokenizer=new r((new o).getRules())};n.inherits(a,i),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),r=this.$tokenizer.getLineTokens(t,e),o=r.tokens;if(o.length&&"comment"==o[o.length-1].type)return i;if("start"==e){var s=t.match(/^.*[\{\(\[\:]\s*$/);s&&(i+=n)}return i};var e={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(t,n,i){if("\r\n"!==i&&"\r"!==i&&"\n"!==i)return!1;var r=this.$tokenizer.getLineTokens(n.trim(),t).tokens;if(!r)return!1;do var o=r.pop();while(o&&("comment"==o.type||"text"==o.type&&o.value.match(/^\s+$/)));return o?"keyword"==o.type&&e[o.value]:!1},this.autoOutdent=function(e,t,n){n+=1;var i=this.$getIndent(t.getLine(n)),r=t.getTabString();i.slice(-r.length)==r&&t.remove(new s(n,i.length-r.length,n,i.length))}}.call(a.prototype),t.Mode=a}),define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,r=t.reservedKeywords="!|{|}|case|do|done|elif|else|esac|fi|for|if|in|then|until|while|&|;|export|local|read|typeset|unset|elif|select|set",o=t.languageConstructs="[|]|alias|bg|bind|break|builtin|cd|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|wait",s=function(){var e=this.createKeywordMapper({keyword:r,"support.function.builtin":o,"invalid.deprecated":"debugger"},"identifier"),t="(?:(?:[1-9]\\d*)|(?:0))",n="(?:\\.\\d+)",i="(?:\\d+)",s="(?:(?:"+i+"?"+n+")|(?:"+i+"\\.))",a="(?:(?:"+s+"|"+i+"))",l="(?:"+a+"|"+s+")",g="(?:&"+i+")",h="[a-zA-Z][a-zA-Z0-9_]*",u="(?:(?:\\$"+h+")|(?:"+h+"=))",c="(?:\\$(?:SHLVL|\\$|\\!|\\?))",p="(?:"+h+"\\s*\\(\\))";this.$rules={start:[{token:["text","comment"],regex:/(^|\s)(#.*)$/},{token:"string",regex:'"(?:[^\\\\]|\\\\.)*?"'},{token:"variable.language",regex:c},{token:"variable",regex:u},{token:"support.function",regex:p},{token:"support.function",regex:g},{token:"string",regex:"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:l},{token:"constant.numeric",regex:t+"\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"}]}};n.inherits(s,i),t.ShHighlightRules=s});