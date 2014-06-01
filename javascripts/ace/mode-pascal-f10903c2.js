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
define("ace/mode/pascal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/pascal_highlight_rules","ace/mode/folding/coffee"],function(e,t){var n=e("../lib/oop"),o=e("./text").Mode,i=e("../tokenizer").Tokenizer,a=e("./pascal_highlight_rules").PascalHighlightRules,r=e("./folding/coffee").FoldMode,l=function(){var e=new a;this.foldingRules=new r,this.$tokenizer=new i(e.getRules())};n.inherits(l,o),function(){this.lineCommentStart=["--","//"],this.blockComment=[{start:"(*",end:"*)"},{start:"{",end:"}"}]}.call(l.prototype),t.Mode=l}),define("ace/mode/pascal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{caseInsensitive:!0,token:"keyword.control.pascal",regex:"\\b(?:(absolute|abstract|all|and|and_then|array|as|asm|attribute|begin|bindable|case|class|const|constructor|destructor|div|do|do|else|end|except|export|exports|external|far|file|finalization|finally|for|forward|goto|if|implementation|import|in|inherited|initialization|interface|interrupt|is|label|library|mod|module|name|near|nil|not|object|of|only|operator|or|or_else|otherwise|packed|pow|private|program|property|protected|public|published|qualified|record|repeat|resident|restricted|segment|set|shl|shr|then|to|try|type|unit|until|uses|value|var|view|virtual|while|with|xor))\\b"},{caseInsensitive:!0,token:["variable.pascal","text","storage.type.prototype.pascal","entity.name.function.prototype.pascal"],regex:"\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?(?=(?:\\(.*?\\))?;\\s*(?:attribute|forward|external))"},{caseInsensitive:!0,token:["variable.pascal","text","storage.type.function.pascal","entity.name.function.pascal"],regex:"\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?"},{token:"constant.numeric.pascal",regex:"\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"punctuation.definition.comment.pascal",regex:"--",push:[{token:"comment.line.double-dash.pascal.one",regex:"$",next:"pop"},{defaultToken:"comment.line.double-dash.pascal.one"}]},{token:"punctuation.definition.comment.pascal",regex:"//",push:[{token:"comment.line.double-slash.pascal.two",regex:"$",next:"pop"},{defaultToken:"comment.line.double-slash.pascal.two"}]},{token:"punctuation.definition.comment.pascal",regex:"\\(\\*",push:[{token:"punctuation.definition.comment.pascal",regex:"\\*\\)",next:"pop"},{defaultToken:"comment.block.pascal.one"}]},{token:"punctuation.definition.comment.pascal",regex:"\\{",push:[{token:"punctuation.definition.comment.pascal",regex:"\\}",next:"pop"},{defaultToken:"comment.block.pascal.two"}]},{token:"punctuation.definition.string.begin.pascal",regex:'"',push:[{token:"constant.character.escape.pascal",regex:"\\\\."},{token:"punctuation.definition.string.end.pascal",regex:'"',next:"pop"},{defaultToken:"string.quoted.double.pascal"}]},{token:"punctuation.definition.string.begin.pascal",regex:"'",push:[{token:"constant.character.escape.apostrophe.pascal",regex:"''"},{token:"punctuation.definition.string.end.pascal",regex:"'",next:"pop"},{defaultToken:"string.quoted.single.pascal"}]},{token:"keyword.operator",regex:"[+\\-;,/*%]|:=|="}]},this.normalizeRules()};n.inherits(i,o),t.PascalHighlightRules=i}),define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){var n=e("../../lib/oop"),o=e("./fold_mode").FoldMode,i=e("../../range").Range,a=t.FoldMode=function(){};n.inherits(a,o),function(){this.getFoldWidgetRange=function(e,t,n){var o=this.indentationBlock(e,n);if(o)return o;var a=/\S/,r=e.getLine(n),l=r.search(a);if(-1!=l&&"#"==r[l]){for(var s=r.length,c=e.getLength(),p=n,d=n;++n<c;){r=e.getLine(n);var u=r.search(a);if(-1!=u){if("#"!=r[u])break;d=n}}if(d>p){var g=e.getLine(d).length;return new i(p,s,d,g)}}},this.getFoldWidget=function(e,t,n){var o=e.getLine(n),i=o.search(/\S/),a=e.getLine(n+1),r=e.getLine(n-1),l=r.search(/\S/),s=a.search(/\S/);if(-1==i)return e.foldWidgets[n-1]=-1!=l&&s>l?"start":"","";if(-1==l){if(i==s&&"#"==o[i]&&"#"==a[i])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(l==i&&"#"==o[i]&&"#"==r[i]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return e.foldWidgets[n-1]=-1!=l&&i>l?"start":"",s>i?"start":""}}.call(a.prototype)});