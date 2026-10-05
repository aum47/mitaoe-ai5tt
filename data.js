const SUB={
    LAMC:["Linear Algebra & Multivariable Calculus"],DELD:["Digital Electronics & Logic"],PFC:["Physics for Computing"],
    AI:["Artificial Intelligence"],EMOS:["Entrepreneurial Mindset & Opportunity Sensing"],CTP:["Computational Thinking & Programming"],
    LL:["Liberal Learning"],CS:["English for Communication"],MT:["Maths Tutorial"],FL:["Foreign Language"]};
    const TEA={AS:"Azhar Shaikh",SK:"Sidhant Kulkarni",PG:"Prashant Ghule",MAK:"Mayura A. Kulkarni",SP:"Satling Pujari",SS:"Sudarshan Sahane",
        DK:"Dipti Kale",NM:"Nimesh Momaya",YK:"Yogesh Khairnar",MK:"Manish P. Khare",PS:"Priyanka Shitole",KS:"Krishna S."};
        const KIND={theory:"Lecture",lab:"Lab",tut:"Tutorial"};
        // [start,end,subject,type,room,teacher,audience]
        const D=[[],
[["13:15","15:05","CTP","lab","LL","NM","A51"],["13:15","15:05","DELD","lab","CL4","SK","A52"],["13:15","15:05","CS","tut","TUT1","PS","A53"],["15:10","16:00","MT","tut","K101","AS","A51"],["16:00","16:50","MT","tut","K101","AS","A52"]],
[["08:30","10:20","EMOS","tut","TUT1","SP","A5A"],["08:30","10:20","AI","lab","CL3","MAK","A5B"],["10:30","11:25","DELD","theory","K201","SK","all"],["11:25","12:20","MT","tut","TUT2","AS","A53"],["13:15","14:10","PFC","theory","K201","PG","all"],["14:10","15:05","LAMC","theory","K201","AS","all"],["15:10","16:00","EMOS","theory","K201","NBC","all"]],
[["08:30","10:20","CTP","lab","CL3","SS","A53"],["08:30","10:20","DELD","lab","CL4","PV","A51"],["08:30","10:20","CS","lab","LL","PS","A52"],["10:30","11:25","LAMC","theory","K201","AS","all"],["11:25","12:20","AI","theory","K201","MAK","all"],["13:15","15:05","CTP","lab","CL1","SDP","A51"],["13:15","15:05","CTP","lab","CL2","SDP","A52"],["13:15","15:05","CTP","lab","CL3","SDP","A53"],["15:10","16:50","EMOS","tut","TUT2","YK","A5B"],["15:10","16:50","AI","lab","CL4","MAK","A5A"]],
[["10:30","11:25","LAMC","theory","K201","AS","all"],["11:25","12:20","DELD","theory","K201","SK","all"],["13:15","15:05","LL","theory","K102","DK","all"],["15:10","16:50","CTP","lab","CL1","SS","A52"],["15:10","16:50","DELD","lab","CL4","SK","A53"],["15:10","16:50","CS","lab","LL","KS","A51"]],
[["08:30","10:20","CS","tut","TUT2","PS","A51"],["08:30","10:20","CS","tut","TUT1","KS","A52"],["10:30","11:25","CTP","theory","K201","SS","all"],["11:25","12:20","PFC","theory","K201","PG","all"],["13:15","15:05","PFC","lab","E023 (Main Campus)","MK","A51"],["15:10","16:50","PFC","lab","E023 (Main Campus)","MK","A52"],["15:10","16:50","PFC","lab","D008B (Main Campus)","PG","A53"]],
[["10:30","12:20","FL","theory","D011 / D109 / D203","","all"]]];//D-END
const HOL=["2026-10-02","2026-10-20","2026-11-08","2026-11-24","2026-12-25","2027-01-26"];//H-END
const mins=t=>{const[a,b]=t.split(":");return +a*60+ +b};
const KIND2={theory:"Theory",lab:"Lab",tut:"Tutorial"};
const isoOf=n=>n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0");
// Lecture starting within the next 10 minutes for this batch (used by the page AND the service worker)
function alertFor(c,n){
    const cur=n.getHours()*60+n.getMinutes();
    if(HOL.includes(isoOf(n)))return null;
    const e=(D[n.getDay()]||[]).filter(x=>(x[6]==="all"||x[6]===c.b||x[6]===c.s)&&mins(x[0])>cur&&mins(x[0])-cur<=10).sort((a,b)=>mins(a[0])-mins(b[0]))[0];
    if(!e)return null;
    const m=mins(e[0])-cur;
    return{tag:"lec-"+isoOf(n)+"-"+e[0],title:`⏰ ${c.name?"Hi "+c.name+", your":"Your"} next session starts at ${e[0]} (in ${m} min)`,body:`${e[2]} (${KIND2[e[3]]}) – Room ${e[4]}${e[5]?" – "+(TEA[e[5]]||e[5]):""}, till ${e[1]}`}}
