(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0bbfc7d4"],{"206d":function(a,s,e){"use strict";var i=e("4413"),t=e.n(i);t.a},4413:function(a,s,e){},a55b:function(a,s,e){"use strict";e.r(s);var i=function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("section",{staticClass:"columns is-mobile is-centered"},[e("div",{staticClass:"box",attrs:{id:"login"}},[e("div",{staticClass:"column"},[e("b-field",{attrs:{label:"Email","label-position":"on-border"}},[e("b-input",{attrs:{type:"email",lazy:!0,maxlength:"150","validation-message":"Por favor insira um endereço de email válido",required:""},model:{value:a.email,callback:function(s){a.email=s},expression:"email"}})],1),e("b-field",{attrs:{label:"Password","label-position":"on-border"}},[e("b-input",{attrs:{type:"password",lazy:!0,"validation-message":"Por favor insira uma senha","password-reveal":"",required:""},model:{value:a.password,callback:function(s){a.password=s},expression:"password"}})],1),e("b-field",{staticClass:"has-text-centered"},[e("b-button",{staticClass:"is-primary",on:{click:function(s){return a.submit()}}},[a._v(" Login ")])],1)],1)])])},t=[],n={name:"Login",data:function(){return{email:"",password:""}},methods:{submit:function(){var a=this;this.$store.dispatch("auth/login",{email:this.email,password:this.password},{root:!0}).then((function(){a.$router.push("/clients")})).catch((function(){a.$buefy.toast.open({duration:1500,message:"Credenciais inválidas",type:"is-danger"})}))}}},o=n,r=(e("206d"),e("2877")),l=Object(r["a"])(o,i,t,!1,null,null,null);s["default"]=l.exports}}]);
//# sourceMappingURL=chunk-0bbfc7d4.c04bdc7b.js.map