const KEY="halilahPlanV1";
let data=JSON.parse(localStorage.getItem(KEY)||"null")||{
 settings:{year:"1448-1449هـ",semester:"الفصل الدراسي الأول",school:"ثانوية الحليلة الأولى",principal:"سهاد الكشي"},
 activities:[
  {week:"الأسبوع الأول",field:"تهيئة مدرسية",title:"لقاء التهيئة وبداية الفصل الدراسي",date:"",status:"مخطط"},
  {week:"الأسبوع الثاني",field:"تعليمي",title:"فعالية تعليمية",date:"",status:"مخطط"}
 ]
};
function save(){localStorage.setItem(KEY,JSON.stringify(data));render();}
function saveSettings(){data.settings={year:year.value,semester:semester.value,school:school.value,principal:principal.value};save();alert("تم حفظ بيانات المدرسة");}
function render(){
 year.value=data.settings.year; semester.value=data.settings.semester; school.value=data.settings.school; principal.value=data.settings.principal;
 planBody.innerHTML=data.activities.map((a,i)=>`<tr><td>${i+1}</td><td>${a.week}</td><td>${a.field}</td><td>${a.title}</td><td>${a.date||"—"}</td><td><span class="status ${a.status==="منفذ"?"done":a.status==="قيد التنفيذ"?"progress":"planned"}">${a.status}</span></td><td><button onclick="editActivity(${i})">تعديل</button> <button onclick="deleteActivity(${i})">حذف</button></td></tr>`).join("");
 activityList.innerHTML=data.activities.map((a,i)=>`<article class="activity"><div><h4>${a.title}</h4><p>${a.week} · ${a.field} · ${a.status}${a.date?" · "+a.date:""}</p></div><button onclick="editActivity(${i})">تعديل</button></article>`).join("");
 activityCount.textContent=data.activities.length;
 doneCount.textContent=data.activities.filter(x=>x.status==="منفذ").length;
 progressCount.textContent=data.activities.filter(x=>x.status==="قيد التنفيذ").length;
 plannedCount.textContent=data.activities.filter(x=>x.status==="مخطط").length;
}
function addActivity(){
 const title=prompt("اسم النشاط أو الفعالية:"); if(!title)return;
 const week=prompt("الأسبوع:","الأسبوع الأول")||"";
 const field=prompt("المجال:","تعليمي")||"";
 const date=prompt("التاريخ (اختياري):","")||"";
 data.activities.push({title,week,field,date,status:"مخطط"});save();
}
function editActivity(i){
 const a=data.activities[i];
 a.title=prompt("اسم النشاط:",a.title)||a.title;
 a.week=prompt("الأسبوع:",a.week)||a.week;
 a.field=prompt("المجال:",a.field)||a.field;
 a.date=prompt("التاريخ:",a.date)||"";
 a.status=prompt("الحالة: مخطط / قيد التنفيذ / منفذ",a.status)||a.status;
 save();
}
function deleteActivity(i){if(confirm("حذف هذا البند؟")){data.activities.splice(i,1);save();}}
function exportData(){
 const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="خطة-ثانوية-الحليلة-الأولى.json";a.click();URL.revokeObjectURL(a.href);
}
function importData(e){
 const file=e.target.files[0];if(!file)return;
 const r=new FileReader();r.onload=()=>{try{data=JSON.parse(r.result);save();alert("تمت استعادة البيانات")}catch{alert("الملف غير صالح")}};r.readAsText(file);
}
function resetData(){if(confirm("سيتم حذف البيانات المحفوظة على هذا الجهاز. هل أنت متأكدة؟")){localStorage.removeItem(KEY);location.reload();}}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.getElementById(b.dataset.tab).classList.add("active");});
render();