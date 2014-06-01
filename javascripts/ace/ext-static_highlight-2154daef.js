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
define("ace/ext/static_highlight",["require","exports","module","ace/edit_session","ace/layer/text"],function(e,t){var s=e("../edit_session").EditSession,a=e("../layer/text").Text,r=".ace_editor {font-family: 'Monaco', 'Menlo', 'Droid Sans Mono', 'Courier New', monospace;font-size: 12px;}.ace_editor .ace_gutter { width: 25px !important;display: block;float: left;text-align: right; padding: 0 3px 0 0; margin-right: 3px;}.ace_line { clear: both; }*.ace_gutter-cell {-moz-user-select: -moz-none;-khtml-user-select: none;-webkit-user-select: none;user-select: none;}";t.render=function(e,t,c,n,i){n=parseInt(n||1,10);var o=new s("");o.setMode(t),o.setUseWorker(!1);var l=new a(document.createElement("div"));l.setSession(o),l.config={characterWidth:10,lineHeight:20},o.setValue(e);for(var d=[],u=o.getLength(),p=0;u>p;p++)d.push("<div class='ace_line'>"),i||d.push("<span class='ace_gutter ace_gutter-cell' unselectable='on'>"+(p+n)+"</span>"),l.$renderLine(d,p,!0,!1),d.push("</div>");var h="<div class=':cssClass'>        <div class='ace_editor ace_scroller ace_text-layer'>            :code        </div>    </div>".replace(/:cssClass/,c.cssClass).replace(/:code/,d.join(""));return l.destroy(),{css:r+c.cssText,html:h}}});