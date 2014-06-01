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
 *
 * Contributor(s):
 * 
 *
 *
 * ***** END LICENSE BLOCK ***** */
define("ace/mode/makefile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/makefile_highlight_rules","ace/mode/folding/coffee"],function(e,t){var i=e("../lib/oop"),n=e("./text").Mode,o=e("../tokenizer").Tokenizer,r=e("./makefile_highlight_rules").MakefileHighlightRules,a=e("./folding/coffee").FoldMode,l=function(){var e=new r;this.foldingRules=new a,this.$tokenizer=new o(e.getRules())};i.inherits(l,n),function(){this.lineCommentStart="#"}.call(l.prototype),t.Mode=l}),define("ace/mode/makefile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules","ace/mode/sh_highlight_rules"],function(e,t){var i=e("../lib/oop"),n=e("./text_highlight_rules").TextHighlightRules,o=e("./sh_highlight_rules"),r=function(){var e=this.createKeywordMapper({keyword:o.reservedKeywords,"support.function.builtin":o.languageConstructs,"invalid.deprecated":"debugger"},"string");this.$rules={start:[{token:"string.interpolated.backtick.makefile",regex:"`",next:"shell-start"},{token:"punctuation.definition.comment.makefile",regex:/#(?=.)/,next:"comment"},{token:["keyword.control.makefile"],regex:"^(?:\\s*\\b)(\\-??include|ifeq|ifneq|ifdef|ifndef|else|endif|vpath|export|unexport|define|endef|override)(?:\\b)"},{token:["entity.name.function.makefile","text"],regex:"^([^\\t ]+(?:\\s[^\\t ]+)*:)(\\s*.*)"}],comment:[{token:"punctuation.definition.comment.makefile",regex:/.+\\/},{token:"punctuation.definition.comment.makefile",regex:".+",next:"start"}],"shell-start":[{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"string",regex:"\\w+"},{token:"string.interpolated.backtick.makefile",regex:"`",next:"start"}]}};i.inherits(r,n),t.MakefileHighlightRules=r}),define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var i=e("../lib/oop"),n=e("./text_highlight_rules").TextHighlightRules,o=t.reservedKeywords="!|{|}|case|do|done|elif|else|esac|fi|for|if|in|then|until|while|&|;|export|local|read|typeset|unset|elif|select|set",r=t.languageConstructs="[|]|alias|bg|bind|break|builtin|cd|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|wait",a=function(){var e=this.createKeywordMapper({keyword:o,"support.function.builtin":r,"invalid.deprecated":"debugger"},"identifier"),t="(?:(?:[1-9]\\d*)|(?:0))",i="(?:\\.\\d+)",n="(?:\\d+)",a="(?:(?:"+n+"?"+i+")|(?:"+n+"\\.))",l="(?:(?:"+a+"|"+n+"))",s="(?:"+l+"|"+a+")",g="(?:&"+n+")",d="[a-zA-Z][a-zA-Z0-9_]*",f="(?:(?:\\$"+d+")|(?:"+d+"=))",u="(?:\\$(?:SHLVL|\\$|\\!|\\?))",c="(?:"+d+"\\s*\\(\\))";this.$rules={start:[{token:["text","comment"],regex:/(^|\s)(#.*)$/},{token:"string",regex:'"(?:[^\\\\]|\\\\.)*?"'},{token:"variable.language",regex:u},{token:"variable",regex:f},{token:"support.function",regex:c},{token:"support.function",regex:g},{token:"string",regex:"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:s},{token:"constant.numeric",regex:t+"\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"}]}};i.inherits(a,n),t.ShHighlightRules=a}),define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){var i=e("../../lib/oop"),n=e("./fold_mode").FoldMode,o=e("../../range").Range,r=t.FoldMode=function(){};i.inherits(r,n),function(){this.getFoldWidgetRange=function(e,t,i){var n=this.indentationBlock(e,i);if(n)return n;var r=/\S/,a=e.getLine(i),l=a.search(r);if(-1!=l&&"#"==a[l]){for(var s=a.length,g=e.getLength(),d=i,f=i;++i<g;){a=e.getLine(i);var u=a.search(r);if(-1!=u){if("#"!=a[u])break;f=i}}if(f>d){var c=e.getLine(f).length;return new o(d,s,f,c)}}},this.getFoldWidget=function(e,t,i){var n=e.getLine(i),o=n.search(/\S/),r=e.getLine(i+1),a=e.getLine(i-1),l=a.search(/\S/),s=r.search(/\S/);if(-1==o)return e.foldWidgets[i-1]=-1!=l&&s>l?"start":"","";if(-1==l){if(o==s&&"#"==n[o]&&"#"==r[o])return e.foldWidgets[i-1]="",e.foldWidgets[i+1]="","start"}else if(l==o&&"#"==n[o]&&"#"==a[o]&&-1==e.getLine(i-2).search(/\S/))return e.foldWidgets[i-1]="start",e.foldWidgets[i+1]="","";return e.foldWidgets[i-1]=-1!=l&&o>l?"start":"",s>o?"start":""}}.call(r.prototype)});