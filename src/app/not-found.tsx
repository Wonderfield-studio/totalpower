import Link from "next/link";

export default function NotFound() {
  return <main style={{minHeight:"100svh",display:"grid",placeItems:"center",padding:"24px",background:"#04111e",color:"#f7f5ef",textAlign:"center",fontFamily:'"Avenir Next","Segoe UI",sans-serif'}}><div><p style={{color:"#ff5a1f",fontWeight:800,letterSpacing:".15em",textTransform:"uppercase",fontSize:"11px"}}>404 · Power interrupted</p><h1 style={{margin:"18px 0",fontSize:"clamp(60px,10vw,140px)",lineHeight:.9,letterSpacing:"-.065em",fontWeight:600,textTransform:"uppercase"}}>This page<br/>lost power.</h1><p style={{color:"#aebac0",fontSize:"18px"}}>Let’s get you back somewhere with the lights on.</p><Link href="/" style={{display:"inline-block",marginTop:"24px",padding:"15px 22px",borderRadius:"999px",background:"#ff5a1f",color:"white",textDecoration:"none",fontWeight:700}}>Back to Home →</Link></div></main>;
}
