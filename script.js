const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const menuToggle = $("#menuToggle"), navLinks = $("#navLinks");
menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.innerHTML = navLinks.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});
$$(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const modal = $("#bookingModal"), modalClose = $("#modalClose");
const modalPickup = $("#modalPickup"), modalDrop = $("#modalDrop");
const success = $("#successMessage"), toast = $("#toast");

function showToast(message, type="normal") {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  window.setTimeout(() => toast.classList.remove("show"), 3000);
}
function openBooking(pickup="", drop="") {
  modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
  if (pickup) modalPickup.value = pickup;
  if (drop) modalDrop.value = drop;
  success.className = "success-message"; success.textContent = "";
  document.body.style.overflow = "hidden";
  setTimeout(() => modal.querySelector('input[name="name"]')?.focus(), 50);
}
function closeBooking() {
  modal.classList.remove("show"); modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
$$("[data-book]").forEach(btn => btn.addEventListener("click", () => openBooking()));
modalClose?.addEventListener("click", closeBooking);
modal?.addEventListener("click", e => { if (e.target === modal) closeBooking(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeBooking(); });

$("#heroBook")?.addEventListener("click", () => {
  const pickup = $("#pickup").value.trim(), drop = $("#drop").value.trim();
  if (!pickup || !drop) return showToast("Please enter pickup and drop location.", "error");
  openBooking(pickup, drop);
});

const date = $("#rideDate");
if (date) date.min = new Date().toISOString().split("T")[0];

async function postJSON(url, payload) {
  const res = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)});
  const data = await res.json().catch(() => ({success:false,message:"Invalid server response."}));
  if (!res.ok || !data.success) throw new Error(data.message || "Request failed.");
  return data;
}

$("#bookingForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, button = form.querySelector("button[type=submit]");
  button.disabled = true; button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
  try {
    await postJSON("api/bookings.php", Object.fromEntries(new FormData(form).entries()));
    success.className = "success-message show";
    success.innerHTML = '<i class="fa-solid fa-circle-check"></i> Booking request saved successfully. We will contact you shortly.';
    form.reset(); if (date) date.min = new Date().toISOString().split("T")[0];
    setTimeout(closeBooking, 2600);
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    button.disabled = false; button.innerHTML = 'Confirm Booking <i class="fa-solid fa-arrow-right"></i>';
  }
});

$("#contactForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const form=e.target, status=$("#contactStatus"), button=form.querySelector("button");
  button.disabled=true; status.textContent="Sending...";
  try {
    await postJSON("api/contact.php", Object.fromEntries(new FormData(form).entries()));
    status.className="form-status success"; status.textContent="Thank you! Your enquiry has been received.";
    form.reset();
  } catch(err) {
    status.className="form-status error"; status.textContent=err.message;
  } finally { button.disabled=false; }
});

const reviews = [
 {name:"Rohit Sharma",city:"Patna, Bihar",text:"Soft Ride made my daily commute so easy. The drivers are professional and on time.",initials:"RS"},
 {name:"Priya Singh",city:"Ranchi, Jharkhand",text:"Great service! Clean cars and very good behavior. Highly recommended!",initials:"PS"},
 {name:"Amit Kumar",city:"Gaya, Bihar",text:"Booked for an outstation trip. It was smooth, safe and completely hassle-free.",initials:"AK"}
];
let reviewIndex=0;
function renderReview(){
 const r=reviews[reviewIndex];
 $("#reviewCard").innerHTML=`<div class="review-top"><div class="review-user"><div class="avatar">${r.initials}</div><div><h3>${r.name}</h3><small>${r.city}</small></div></div><div class="stars">★★★★★</div></div><p>“${r.text}”</p>`;
}
renderReview();
$("#nextReview")?.addEventListener("click",()=>{reviewIndex=(reviewIndex+1)%reviews.length;renderReview()});
$("#prevReview")?.addEventListener("click",()=>{reviewIndex=(reviewIndex-1+reviews.length)%reviews.length;renderReview()});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting) entry.target.classList.add("visible")}), {threshold:.08});
$$("section,.fleet-card,.service-card,.price-card").forEach(el=>observer.observe(el));
