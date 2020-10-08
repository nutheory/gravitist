(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{499:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=k(a(56)),o=k(a(57)),i=k(a(12)),r=k(a(15)),l=k(a(13)),s=k(a(14)),c=a(2),d=k(c),u=(a(29),a(259)),p=k(a(264)),f=a(261),m=k(a(725)),h=(k(a(726)),k(a(744))),v=(k(a(36)),k(a(849))),g=k(a(639)),y=k(a(866)),b=k(a(875)),w=k(a(878));k(a(879));function k(e){return e&&e.__esModule?e:{default:e}}var x=a(484).Buffer,C=(0,f.getEnv)(window.location.host),E=p.default.base_url[C],N=p.default.aws.accessKeyId,S=function(e){function t(){(0,i.default)(this,t);var e=(0,l.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={showSubmitForReview:!1,showProgressBar:!1,uploadProgress:0,uploadCompleted:!1},e.uppy={},e.addFileObjsToUppy=e.addFileObjsToUppy.bind(e),e.handleDrop=e.handleDrop.bind(e),e.uploadProgress=0,e.renderPreview=e.renderPreview.bind(e),e.onBrowseClick=e.onBrowseClick.bind(e),e.onInputChange=e.onInputChange.bind(e),e.handleReviewSubmit=e.handleReviewSubmit.bind(e),e.checkDragDropSupport=e.checkDragDropSupport.bind(e),e}var a;return(0,s.default)(t,e),(0,r.default)(t,[{key:"componentDidMount",value:function(){var e=this;this.handleDrop(),this.uppy=(0,g.default)({id:this.props.source,meta:{source:this.props.source,instanceOf:this.props.fieldname,uploadToId:this.props.uploadToId},restrictions:{allowedFileTypes:w.default[this.props.mimes]},autoProceed:this.props.auto||!1,onBeforeFileAdded:function(t,a){-1===w.default[e.props.mimes].indexOf(t.type)&&alert("The "+e.props.mimes.slice(0,-1)+" 'type' you tried to add is not supported. Please upload one of the following types "+w.default[e.props.mimes]+".")}}),this.uppy.use(y.default,{endpoint:this.props.endpoint,fieldName:this.props.fieldname,headers:{authorization:localStorage.getItem("hf_auth_header_token")}}),this.uppy.run()}},{key:"checkDragDropSupport",value:function(){var e=document.createElement("div");return"draggable"in e&&"ondragstart"in e&&"ondrop"in e&&("FormData"in window&&"FileReader"in window)}},{key:"generatePreview",value:(a=(0,o.default)(n.default.mark((function e(t){var a,o;return n.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.size<4e7&&!0!==this.props.auto&&"documents"!==this.props.mimes?(a=new FileReader,o=this,a.onload=function(e){o.setState({preview:e.target.result,previewInfo:t})},a.readAsDataURL(t)):this.setState({previewInfo:t});case 1:case"end":return e.stop()}}),e,this)}))),function(e){return a.apply(this,arguments)})},{key:"renderPreview",value:function(){return this.state.previewInfo&&(0,u.contains)(this.state.previewInfo.type,w.default.images)?d.default.createElement("div",{id:"preview"+this.props.source,className:"w-full h-full"},d.default.createElement("img",{src:this.state.preview,className:"h-full w-full "+(this.props.circle?"circle":"")}),d.default.createElement("div",{className:" "+(this.props.circle?"edit-upload-overlay-circle":"edit-upload-overlay"),onClick:this.onBrowseClick},d.default.createElement("i",{className:"far fa-edit"}))):this.state.previewInfo&&(0,u.contains)(this.state.previewInfo.type,w.default.videos)?d.default.createElement("div",{id:"preview"+this.props.source,className:"w-full h-full"},d.default.createElement("video",{width:"100%",className:"rounded-lg border border-grey-dark",controls:!0},d.default.createElement("source",{src:this.state.preview,type:"video/mp4"})),d.default.createElement("div",{className:" "+(this.props.circle?"edit-upload-overlay-circle":"edit-upload-overlay"),onClick:this.onBrowseClick},d.default.createElement("i",{className:"far fa-edit fa-2x"}))):d.default.createElement("div",{id:"preview"+this.props.source,className:""},d.default.createElement("i",{className:"fas fa-check fa-4x"}),d.default.createElement("div",{className:" "+(this.props.circle?"edit-upload-overlay-circle":"edit-upload-overlay"),onClick:this.onBrowseClick},d.default.createElement("i",{className:"far fa-edit fa-2x"})))}},{key:"handleDrop",value:function(){var e=this;(0,b.default)(this.dropzone,{onDrop:function(t,a){e.generatePreview(t[0]),e.addFileObjsToUppy(t)},onDragEnter:function(){e.dropzone&&e.dropzone.classList.add("border-2 border-solid border-green-light")},onDragLeave:function(){e.dropzone&&e.dropzone.classList.remove("border-2 border-solid border-green-light")}})}},{key:"onInputChange",value:function(e){var t=Array.prototype.slice.call(e.currentTarget.files);this.generatePreview(t[0]),this.addFileObjsToUppy(t)}},{key:"onBrowseClick",value:function(){this.inputElement&&this.inputElement.click()}},{key:"addFileObjsToUppy",value:function(e){var t=this;e.forEach((function(e){t.uppy.addFile({source:t.props.source,name:e.name,lastModified:e.lastModified,type:e.type,data:e})})),"S3"===this.props.uploadMethod?(this.setState({showSubmitForReview:!0,uploadS3:e[0],evaporateConfig:{signerUrl:E+"/auth-signature",signHeaders:{Authorization:localStorage.getItem("hf_auth_header_token")},aws_key:N,aws_url:"https://s3.us-west-1.amazonaws.com",awsRegion:"us-west-1",bucket:"homefilming",computeContentMd5:!0,cryptoMd5Method:function(e){return h.default.createHash("md5").update(x.from(e)).digest("base64")},cryptoHexEncodedHash256:function(e){return h.default.createHash("sha256").update(e).digest("hex")}}}),this.props.returnUploadInstance({hideIrrelevant:!0})):this.props.returnUploadInstance(this.uppy)}},{key:"handleReviewSubmit",value:function(){var e=this,t=this,a=this.state;return m.default.create(a.evaporateConfig).then((function(n){new File([""],"file_object_to_upload");var o={name:a.uploadS3?("production"===C?"":"development/")+e.props.endpoint:null,file:a.uploadS3,started:function(){t.setState({showProgressBar:!0,showSubmitForReview:!1})},progress:function(e){t.setState({uploadProgress:e})},complete:function(a,n){t.setState({uploadCompleted:!0},(function(){e.props.returnUploadInstance({hideIrrelevant:!0,showUploadSuccess:!0,keyUrl:n})}))}};n.add(o).then((function(e){console.log("File successfully uploaded to:",e)}),(function(e){console.log("File did not upload sucessfully:",e)}))}))}},{key:"render",value:function(){var e=this;return d.default.createElement("div",{className:"h-full"},this.state.showProgressBar?d.default.createElement("div",{className:"h-full"},d.default.createElement(v.default,{progress:this.state.uploadProgress})):d.default.createElement("div",{ref:function(t){return e.dropzone=t},className:(this.props.circle?"circle h-full":"rounded-lg")+" "+(this.props.padding?"p-4":"")+" "+(this.state.showSubmitForReview?"padding-override":"upload-container")+" relative"},d.default.createElement("form",{className:"h-full w-full"},d.default.createElement("input",{ref:function(t){return e.inputElement=t},className:"hidden",type:"file",name:"files[]",value:"",multiple:this.props.multiple||!1,onChange:this.onInputChange}),this.state.preview?this.renderPreview():d.default.createElement("div",{className:"h-full"},d.default.createElement("div",{className:"h-full"},this.state.previewInfo?d.default.createElement("div",{className:"flex"},d.default.createElement("div",{className:"mr-4"},d.default.createElement("i",{className:"text-green-dark fas fa-check fa-2x"})),d.default.createElement("div",{className:"flex-1"},d.default.createElement("h3",{className:"text-sm font-bold"},"Got it"),d.default.createElement("p",{className:"text-sm"},!0!==this.props.auto?"Ready to upload...":"Uploaded"))):d.default.createElement("div",{className:"flex "+(this.props.circle?"flex-wrap justify-center items-center h-full":"")},d.default.createElement("div",{className:this.props.circle?"":"flex"},d.default.createElement("div",{className:this.props.circle?"w-full text-center my-2 self-center":"mr-4"},d.default.createElement("i",{className:("documents"===this.props.mimes?"far fa-file-pdf":"fas fa-cloud-upload-alt")+" fa-2x"})),d.default.createElement("div",{className:this.props.circle?"w-2/3 m-auto":""},d.default.createElement("h3",{className:(this.props.circle?"my-2 text-center":"")+" text-sm font-bold"},this.props.header),d.default.createElement("p",{className:(this.props.circle?"text-center":"")+" text-xs"},"Drag & drop ",this.props.fileTypeName," or click to browse"))))),d.default.createElement("label",{className:"block absolute pin-t pin-l w-full h-full cursor-pointer z-10",onClick:this.onBrowseClick})))),this.state.showSubmitForReview?d.default.createElement("div",{className:"mt-4"},d.default.createElement("button",{className:" action-button button-green",onClick:this.handleReviewSubmit},d.default.createElement("span",{className:" action-button-overlay"}),"Submit for review")):null)}}]),t}(c.Component);t.default=S},524:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=f(a(12)),o=f(a(15)),i=f(a(13)),r=f(a(14)),l=a(2),s=f(l),c=a(259),d=f(a(914)),u=a(261),p=f(a(557));function f(e){return e&&e.__esModule?e:{default:e}}var m=function(e){function t(){(0,n.default)(this,t);var e=(0,i.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={contacts:[]},e.getValidContacts=e.getValidContacts.bind(e),e.getInvalidContacts=e.getInvalidContacts.bind(e),e.buildContact=e.buildContact.bind(e),e.newContact=e.newContact.bind(e),e.updateContact=e.updateContact.bind(e),e.removeContact=e.removeContact.bind(e),e.checkContactsValidated=e.checkContactsValidated.bind(e),e}return(0,r.default)(t,e),(0,o.default)(t,[{key:"componentDidMount",value:function(){if(this.props.contacts&&this.props.contacts.length>0){var e=(0,c.clone)(this.props.contacts);e.map((function(e){if(!e.validated){var t=p.default.filter((function(t){return t.type===e.type?t:null}))[0];e.validated=t.validator(e.content)}return e}));this.setState((function(t){return{contacts:(0,c.concat)(t.contacts,e)}}),(function(){this.state.contacts.length<2&&this.newContact()}))}else this.newContact(2)}},{key:"getInvalidContacts",value:function(){return this.state.contacts.filter((function(e){return!1===e.validated?e:null}))}},{key:"getValidContacts",value:function(){return this.state.contacts.filter((function(e){return!0===e.validated?e:null}))}},{key:"checkContactsValidated",value:function(){this.props.handleReturnedContacts(this.getValidContacts())}},{key:"buildContact",value:function(e){var t={id:"new-"+Math.floor(999999*Math.random()),type:"",content:"",validated:!1,status:"new",default:e.default};this.setState((function(e){return{contacts:e.contacts.concat(t)}}),(function(){e.contactCount>0&&this.buildContact({default:!1,contactCount:e.contactCount-1})}))}},{key:"newContact",value:function(e){this.buildContact({default:!0,contactCount:e||1})}},{key:"updateContact",value:function(e){var t=p.default.filter((function(t){return t.type===e.type?t:null}))[0];t?("phone"===t.type&&(e.content=(0,u.formatPhone)(e.content)),e.validated=t.validator(e.content||"")):e.validated=!1,!0===e.default?this.setState({contacts:this.state.contacts.map((function(t){return t.id===e.id?(0,c.merge)(t,e):(0,c.merge)(t,{default:!1})}))},this.checkContactsValidated):this.setState({contacts:this.state.contacts.map((function(t){return t.id===e.id?(0,c.merge)(t,e):t}))},this.checkContactsValidated),""===e.content&&this.setState({contacts:this.state.contacts.map((function(t,a){return t.id===e.id?(0,c.merge)(t,{content:""}):t}))},this.checkContactsValidated)}},{key:"removeContact",value:function(e,t){new RegExp("^new-","i").test(e)?this.setState((function(e){return{contacts:(0,c.remove)(t,1,e.contacts)}}),this.checkContactsValidated):this.setState({contacts:this.state.contacts.map((function(t,a){return t.id===e?(0,c.merge)(t,{status:"delete",validated:!0}):t}))},this.checkContactsValidated),this.props.restricedMode&&this.state.contacts.length<2&&this.newContact()}},{key:"renderContact",value:function(e){var t=p.default.filter((function(t){return t.type===e.type?t:null}))[0];if(t)return s.default.createElement("div",{className:"flex"},s.default.createElement("div",{className:"mr-4"},s.default.createElement("i",{className:""+t.icon})),s.default.createElement("div",{className:"flex-1 font-bold"},t.formatter?t.formatter(e.content):e.content),s.default.createElement("div",{className:"font-bold text-grey"},t.type))}},{key:"render",value:function(){var e=this;return s.default.createElement("div",null,this.props.editMode?s.default.createElement("div",null,this.props.restrictedMode?s.default.createElement("ul",{id:"contactList"},s.default.createElement("li",{className:"my-2"},this.state.contacts[0]&&"delete"!==this.state.contacts[0].status?s.default.createElement(d.default,{idx:0,default:this.state.contacts[0].default,status:"new"===this.state.contacts[0].status?this.state.contacts[0].status:"update",cId:this.state.contacts[0].id?this.state.contacts[0].id:"",contact:this.state.contacts[0],restrictedMode:this.props.restrictedMode,updateContact:this.updateContact,newContact:this.newContact,removeContact:this.removeContact}):null),s.default.createElement("li",{className:"my-2"},this.state.contacts[1]&&"delete"!==this.state.contacts[1].status?s.default.createElement(d.default,{idx:1,default:this.state.contacts[1].default,status:"new"===this.state.contacts[1].status?this.state.contacts[1].status:"update",cId:this.state.contacts[1].id?this.state.contacts[1].id:"",contact:this.state.contacts[1],restrictedMode:this.props.restrictedMode,updateContact:this.updateContact,newContact:this.newContact,removeContact:this.removeContact}):null)):s.default.createElement("ul",{id:"contactList"},this.state.contacts.map((function(t,a){return s.default.createElement("li",{key:"contact_"+t.id,className:"my-2"},"delete"!==t.status?s.default.createElement(d.default,{idx:a,default:t.default,status:"new"===t.status?t.status:"update",cId:t.id,contact:t,updateContact:e.updateContact,newContact:e.newContact,removeContact:e.removeContact}):null)})))):s.default.createElement("ul",{id:"contactList"},this.state.contacts.map((function(t){return s.default.createElement("li",{key:"contact_"+t.id,className:"my-2"},e.renderContact(t))}))))}}]),t}(l.Component);t.default=m},557:function(e,t,a){"use strict";var n=a(263),o=n.isValidUrl,i=n.isValidName,r=n.isValidPhone,l=n.isValidEmail,s=[{type:"phone",humanized:"Phone",icon:"fa fa-phone",useText:!1,ext:"tel",placeholder:"(555) 555-5555",validator:r,typename:"phone",formatter:a(261).formatPhone,mask:"1 \\(999\\) 999-9999 \\ext. 9999"},{type:"email",humanized:"Email",icon:"fa fa-envelope",useText:!1,ext:"mailto",placeholder:"name@company.com",validator:l,typename:"email"},{type:"skype",humanized:"Skype",icon:"fab fa-skype",useText:!1,ext:"skype",placeholder:"Skype name",validator:i,typename:"name"},{type:"slack",humanized:"Slack",icon:"fab fa-slack",useText:!1,placeholder:"Display name",validator:i,typename:"name"},{type:"msnMessenger",humanized:"MSN Messenger",icon:"fab fa-windows",useText:!1,placeholder:"MSN name",validator:i,typename:"name"},{type:"website",humanized:"Website",icon:"fa fa-desktop",useText:!1,ext:"http://",placeholder:"eg... yoursite.com",validator:o,typename:"url"},{type:"linkedIn",humanized:"LinkedIn",icon:"fab fa-linkedin",useText:!1,placeholder:"LinkedIn name",validator:i,typename:"name"},{type:"facebook",humanized:"Facebook",icon:"fab fa-facebook",useText:!1,placeholder:"Facebook name",validator:i,typename:"name"},{type:"twitter",humanized:"Twitter",icon:"fab fa-twitter",useText:!1,placeholder:"@yourname",validator:i,typename:"name"},{type:"zillow",humanized:"Zillow",icon:"fa fa-id-badge",useText:!0,placeholder:"Zillow name",validator:i,typename:"name"},{type:"trulia",humanized:"Trulia",icon:"fa fa-id-badge",useText:!0,placeholder:"Trulia name",validator:i,typename:"name"},{type:"realitor",humanized:"Realitor.com",icon:"fa fa-id-badge",useText:!0,placeholder:"Realitor.com name",validator:i,typename:"name"},{type:"mlsId",humanized:"MLS ID",icon:"fa fa-id-badge",useText:!0,placeholder:"MLS ID",validator:i,typename:"name"}];e.exports=s},650:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o,i=a(32),r=(n=i)&&n.__esModule?n:{default:n},l=a(16),s=a(23);var c=l.StyleSheet.create((o={contactSplitSection:{display:"flex"},contactContent:{flex:"2"},contactButtonArea:{flexGrow:0,display:"flex"},contactDisplayType:{color:s.c.bFgSoftGrey,fontWeight:"600"},contactButtonMinus:{border:"1px solid "+s.c.bFgSoftGrey,background:s.c.bBgSoftGrey,color:s.c.bTextSoftGrey,":hover":{border:"1px solid "+s.c.bTextSoftGrey}},contactButtonDefaultUnselected:{border:"1px solid "+s.c.bFgSoftGrey,background:s.c.bBgSoftGrey,color:"#ccc",":hover":{border:"1px solid "+s.c.bFgYellow}},contactButtonDefault:{border:"1px solid "+s.c.bFgYellow,background:s.c.bBgYellow,color:s.c.bFgYellow},contactButtonPlus:{border:"1px solid "+s.c.bFgBlue,background:s.c.bBgBlue,color:s.c.bTextBlue,":hover":{border:"1px solid "+s.c.bTextBlue}}},(0,r.default)(o,"contactButtonMinus",{marginRight:"0.75rem"}),(0,r.default)(o,"contactDropdown",{width:"30rem",overflow:"auto"}),(0,r.default)(o,"contactDropdownItem",{width:"10rem",float:"left",padding:"0.25rem 0.75rem",display:"block"}),(0,r.default)(o,"removeButton",{backgroundColor:"rgba(212,0,88,1)"}),(0,r.default)(o,"subduedIcon",{marginRight:"0.6rem",color:s.c.midGrey}),o));t.default=c},749:function(e,t){},751:function(e,t){},762:function(e,t){},764:function(e,t){},791:function(e,t){},793:function(e,t){},794:function(e,t){},799:function(e,t){},801:function(e,t){},808:function(e,t){},810:function(e,t){},829:function(e,t){},831:function(e,t){},843:function(e,t){},846:function(e,t){},849:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(a(2));a(16),o(a(850));function o(e){return e&&e.__esModule?e:{default:e}}a(851);t.default=function(e){var t=Math.floor(100*e.progress);return n.default.createElement("div",{className:"border border-blue-darker bg-blue-lightest p-4 rounded-lg"},n.default.createElement("div",{className:"flex mb-4"},n.default.createElement("div",{className:"text-5xl w-32 text-right font-bold"},t,"%"),n.default.createElement("div",{className:"flex-1 ml-4"},n.default.createElement("div",{className:"font-bold text-sm mb-1"},"Uploading"),n.default.createElement("p",{className:"text-sm"},"Please be patient while we upload your video. After your upload completes we will review your video, and get back to you within 24 hours."))),n.default.createElement("div",{className:"pb-progress"},n.default.createElement("div",{className:"pb-progress-bar",style:{width:0+t+"%"}})))}},850:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(16),o=(a(23),n.StyleSheet.create({progressArea:{marginTop:"2rem"},progressBar:{width:"90%",margin:"-2rem auto 2rem auto"},content:{width:"100%",margin:"auto"},percent:{textAlign:"right",verticalAlign:"top",display:"inline-block",width:"30%",fontSize:"5rem",lineHeight:"5.2rem",fontFamily:'"Droid serif", Times, serif',fontWeight:"bold"},info:{display:"inline-block",paddingLeft:"1rem",width:"calc(70% - 1rem)"},infoHeader:{fontSize:"1.4rem"},infoText:{lineHeight:"1.3rem"}}));t.default=o},851:function(e,t){},878:function(e,t,a){"use strict";e.exports={images:["image/png","image/jpeg","image/gif","image/webp"],documents:["image/png","image/jpeg","image/gif","application/pdf","application/epub+zip","application/msword","application/rtf","application/octet-stream","text/plain"],videos:["video/x-msvideo","video/mpeg","video/ogg","video/webm","video/mp4","application/octet-stream"]}},879:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=a(32),i=(n=o)&&n.__esModule?n:{default:n},r=a(16),l=a(23);var s=r.StyleSheet.create({mainDragDropContainer:{display:"flex",position:"relative",lineHeight:"0",width:"100%",height:"100%",border:"2px dashed #27708c",borderRadius:"6px",background:"#f5f5f5"},mainDragDropIconSuccess:{color:"#6dc949"},mainDragDropContainerHover:{border:"2px solid #23d160"},mainDragDropForm:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},mainDragDropInstruction:{padding:"1rem",position:"relative",textAlign:"center",width:"100%"},hiddenDragDropInput:{width:"0.1px",height:"0.1px",opacity:"0",overflow:"hidden",position:"absolute",zIndex:"-1"},clickableDragDropLabel:{display:"block",position:"absolute",top:"0",left:"0",cursor:"pointer",width:"100%",height:"100%",opacity:"0",zIndex:"10",backgroundColor:"rgba(76, 0, 153, 0.6)"},mainDragDropHeader:{fontSize:"1.4rem",fontFamily:"Avenir Next, Helvetica, Arial, sans-serif",fontWeight:"100",textAlign:"center",marginTop:"0.6rem",lineHeight:"2rem",color:l.c.darkGrey},mainDragDropText:{fontSize:"0.8rem",textAlign:"center",margin:"0.4rem 1rem 0 1rem",lineHeight:"1rem"},changeDragDropOverlay:(0,i.default)({position:"absolute",top:"0",right:"0",padding:"0.4rem 1rem",textAlign:"center",zIndex:"10",margin:"2px",borderRadius:"0 5px 0 5px",backgroundColor:"rgba(32, 156, 238, 0.8)",color:l.c.white},"zIndex","8"),mainDragDropPreview:{width:"100%",height:"100%"},noImagePreview:{display:"flex",background:l.c.mint,color:l.c.green,transition:"all .4s ease-in-out",border:"2px solid "+l.c.green,borderRadius:"6px",alignItems:"center",justifyContent:"center",cursor:"pointer",width:"100%",height:"100%",opacity:"0",zIndex:"6"},reviewButton:{marginTop:"1rem"}});t.default=s},914:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=m(a(32)),o=m(a(12)),i=m(a(15)),r=m(a(13)),l=m(a(14)),s=a(2),c=m(s),d=(m(a(30)),a(16)),u=(a(259),m(a(83)),m(a(650))),p=m(a(652)),f=m(a(557));function m(e){return e&&e.__esModule?e:{default:e}}var h=function(e){function t(e){(0,o.default)(this,t);var a=(0,r.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={idx:e.idx,status:e.status,ext:"text",content:e.content||e.contact.content,default:e.default||e.contact.default,holder:"select type...",icon:"far fa-address-card",properName:"Contact type",typesOpen:!1},a.handleAddContact=a.handleAddContact.bind(a),a.handleRemoveContact=a.handleRemoveContact.bind(a),a.handleDefaultContact=a.handleDefaultContact.bind(a),a.toggleDropdownHandler=a.toggleDropdownHandler.bind(a),a.handleTypeChange=a.handleTypeChange.bind(a),a.handleContentChange=a.handleContentChange.bind(a),a}return(0,l.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){var e=this;if(this.props.contact.type){var t=f.default.filter((function(t){return t.type===e.props.contact.type?t:null}))[0];this.setState((0,n.default)({type:t.name,icon:t.icon,properName:t.humanized,holder:t.holder,ext:t.ext,mask:t.mask,default:this.props.contact.default,content:this.props.contact.content},"type",this.props.contact.type),(function(){}))}}},{key:"handleAddContact",value:function(e){this.props.newContact()}},{key:"handleRemoveContact",value:function(e){this.props.removeContact(e.currentTarget.getAttribute("cid"),e.currentTarget.getAttribute("idx"))}},{key:"handleTypeChange",value:function(e){this.setState({type:e.currentTarget.getAttribute("name"),icon:e.currentTarget.getAttribute("icon"),properName:e.currentTarget.getAttribute("proper"),holder:e.currentTarget.getAttribute("holder"),ext:e.currentTarget.getAttribute("ext"),mask:e.currentTarget.getAttribute("mask"),typesOpen:!1},(function(){this.props.updateContact({id:this.props.cId,type:this.state.type,content:this.state.content})}))}},{key:"handleContentChange",value:function(e){this.setState({content:e.currentTarget.value},(function(){this.props.updateContact({id:this.props.cId,type:this.state.type,content:this.state.content,status:this.state.status})}))}},{key:"handleDefaultContact",value:function(e){this.setState({default:!0},(function(){this.props.updateContact({id:this.props.cId,type:this.state.type,content:this.state.content,status:this.state.status,default:!0})}))}},{key:"toggleDropdownHandler",value:function(){this.setState({typesOpen:!this.state.typesOpen})}},{key:"renderButton",value:function(e,t,a,n,o){return c.default.createElement("button",{onClick:a,cid:""+e,idx:t,className:"h-full "+n},c.default.createElement("span",{className:"flex items-center justify-center"},c.default.createElement("i",{className:""+o})))}},{key:"render",value:function(){var e=this;return c.default.createElement("div",{className:"flex"},this.props.restrictedMode?null:c.default.createElement("div",{className:"mr-4"},this.renderButton(this.props.cId,this.props.idx,this.handleDefaultContact,this.props.contact.default?"text-green-dark":"text-grey-light","fa fa-check")),c.default.createElement("div",{className:"mr-4"},c.default.createElement("div",{className:"dropdown relative "+(this.state.typesOpen?"is-active":"")},c.default.createElement("div",{className:"dropdown-trigger hover:cursor-pointer",onClick:this.toggleDropdownHandler},c.default.createElement("div",{className:"select-faker","aria-haspopup":"true","aria-controls":"dropdown-menu"},c.default.createElement("span",null,""+this.state.properName),c.default.createElement("span",{className:"inline-block ml-6"},c.default.createElement("i",{className:"fa fa-angle-down","aria-hidden":"true"})))),c.default.createElement("div",{className:"dropdown-menu "+(this.state.typesOpen?"block":"hidden"),id:"dropdown-menu",role:"menu"},c.default.createElement("div",{className:"p-2 flex flex-wrap bg-white border border-grey rounded",style:{width:"22rem"}},f.default.map((function(t,a){return c.default.createElement("a",{icon:t.icon,ext:t.ext?t.ext:"text",proper:t.humanized,name:t.type,mask:t.mask,holder:t.placeholder,onClick:e.handleTypeChange,className:"w-1/2 block px-2 py-1 hover:cursor-pointer",key:t.type+"_"+a},c.default.createElement("i",{className:"inline-block mr-3 "+t.icon}),t.humanized)})))))),c.default.createElement("div",{className:"flex-1"+(this.props.restrictedMode?"":" mr-4")},c.default.createElement("div",{className:""},c.default.createElement(p.default,{mask:this.state.mask?this.state.mask:"",onChange:this.handleContentChange,className:"input",type:this.state.ext,value:this.state.content,placeholder:this.state.holder}))),this.props.restrictedMode?null:c.default.createElement("div",{className:(0,d.css)(u.default.contactButtonArea)+" field column is-narrow"}))}}]),t}(s.Component);t.default=h}}]);