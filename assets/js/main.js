/* =========================================================
   RK JHA GROUP — Shared front-end behaviour
   No build step required. Vanilla JS, progressively enhanced.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initRevealOnScroll();
  initCounters();
  initAccordions();
  initTabs();
  initStickyCta();
  initWhatsApp();
  initExitIntent();
  initEmiCalculators();
  initEligibilityCalculators();
  initProgressiveForms();
  initYearStamp();
  initMegaMenuA11y();
});

/* ---------------- Mobile Nav + Bottom Nav ---------------- */
function initMobileNav(){
  const toggle = document.getElementById('mobileNavToggle');
  const panel = document.getElementById('mobileNavPanel');
  if(!toggle || !panel) return;
  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('translate-x-0');
    panel.classList.toggle('translate-x-full', !isOpen);
    document.body.classList.toggle('overflow-hidden', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  panel.querySelectorAll('[data-close-nav]').forEach(el=>{
    el.addEventListener('click', ()=>{
      panel.classList.add('translate-x-full');
      panel.classList.remove('translate-x-0');
      document.body.classList.remove('overflow-hidden');
    });
  });

  // Mobile accordion groups inside nav
  panel.querySelectorAll('[data-mnav-toggle]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const sub = btn.nextElementSibling;
      const open = sub.classList.contains('hidden');
      sub.classList.toggle('hidden');
      btn.querySelector('svg')?.classList.toggle('rotate-180', open);
    });
  });
}

/* ---------------- Scroll reveal ---------------- */
function initRevealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold:.15, rootMargin:'0px 0px -60px 0px' });
  items.forEach(i=>io.observe(i));
}

/* ---------------- Animated counters ---------------- */
function initCounters(){
  const counters = document.querySelectorAll('[data-counter]');
  if(!counters.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
      const dur = 1600; let start = null;
      function step(ts){
        if(!start) start = ts;
        const progress = Math.min((ts-start)/dur, 1);
        const eased = 1 - Math.pow(1-progress, 3);
        el.textContent = (target*eased).toFixed(decimals) + suffix;
        if(progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold:.4 });
  counters.forEach(c=>io.observe(c));
}

/* ---------------- Accordions (FAQ) ---------------- */
function initAccordions(){
  document.querySelectorAll('[data-accordion]').forEach(group=>{
    const items = group.querySelectorAll('.accordion-item');
    items.forEach(item=>{
      const btn = item.querySelector('.accordion-trigger');
      btn?.addEventListener('click', ()=>{
        const isOpen = item.getAttribute('data-open') === 'true';
        if(group.getAttribute('data-accordion') === 'single'){
          items.forEach(i=>i.setAttribute('data-open','false'));
        }
        item.setAttribute('data-open', String(!isOpen));
      });
    });
  });
}

/* ---------------- Tabs (compare plans, etc.) ---------------- */
function initTabs(){
  document.querySelectorAll('[data-tabs]').forEach(group=>{
    const buttons = group.querySelectorAll('[data-tab-btn]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        buttons.forEach(b=>b.setAttribute('aria-selected','false'));
        btn.setAttribute('aria-selected','true');
        const target = btn.getAttribute('data-tab-btn');
        panels.forEach(p=> p.classList.toggle('hidden', p.getAttribute('data-tab-panel') !== target));
      });
    });
  });
}

/* ---------------- Sticky Apply / Call CTA ---------------- */
function initStickyCta(){
  const bar = document.getElementById('stickyCta');
  if(!bar) return;
  const hero = document.getElementById('hero');
  let shown = false;
  window.addEventListener('scroll', ()=>{
    const trigger = hero ? hero.offsetHeight * 0.6 : 400;
    const shouldShow = window.scrollY > trigger;
    if(shouldShow !== shown){
      shown = shouldShow;
      bar.setAttribute('data-show', String(shouldShow));
    }
  }, { passive:true });
}

/* ---------------- Floating WhatsApp pulse ---------------- */
function initWhatsApp(){
  const btn = document.getElementById('waFloat');
  if(!btn) return;
  setTimeout(()=> btn.classList.add('pulse-ring'), 1500);
}

/* ---------------- Exit intent modal ---------------- */
function initExitIntent(){
  const modal = document.getElementById('exitIntentModal');
  if(!modal) return;
  let shown = sessionStorage.getItem('rkj_exit_shown') === '1';
  document.addEventListener('mouseout', (e)=>{
    if(shown) return;
    if(e.clientY < 8 && e.relatedTarget === null){
      modal.classList.remove('hidden');
      shown = true;
      sessionStorage.setItem('rkj_exit_shown','1');
    }
  });
  modal.querySelectorAll('[data-close-modal]').forEach(el=>{
    el.addEventListener('click', ()=> modal.classList.add('hidden'));
  });
}

/* ---------------- EMI Calculator (reusable) ----------------
   Formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1)
   P=principal, r=monthly rate, n=months
--------------------------------------------------------------*/
function computeEmi(principal, annualRatePct, tenureMonths){
  const r = (annualRatePct/12)/100;
  if(r === 0) return principal / tenureMonths;
  const factor = Math.pow(1+r, tenureMonths);
  return (principal * r * factor) / (factor - 1);
}

function formatINR(num){
  return Math.round(num).toLocaleString('en-IN');
}

function initEmiCalculators(){
  document.querySelectorAll('[data-emi-widget]').forEach(widget=>{
    const amountEl = widget.querySelector('[data-emi-amount]');
    const rateEl = widget.querySelector('[data-emi-rate]');
    const tenureEl = widget.querySelector('[data-emi-tenure]');
    const amountOut = widget.querySelector('[data-emi-amount-out]');
    const rateOut = widget.querySelector('[data-emi-rate-out]');
    const tenureOut = widget.querySelector('[data-emi-tenure-out]');
    const emiOut = widget.querySelector('[data-emi-result]');
    const principalOut = widget.querySelector('[data-emi-principal-total]');
    const interestOut = widget.querySelector('[data-emi-interest-total]');
    const totalOut = widget.querySelector('[data-emi-total]');
    const arcInterest = widget.querySelector('[data-emi-arc-interest]');

    if(!amountEl || !rateEl || !tenureEl) return;

    function render(){
      const amount = parseFloat(amountEl.value);
      const rate = parseFloat(rateEl.value);
      const tenure = parseFloat(tenureEl.value);
      const emi = computeEmi(amount, rate, tenure);
      const totalPay = emi * tenure;
      const totalInterest = totalPay - amount;

      if(amountOut) amountOut.textContent = '₹' + formatINR(amount);
      if(rateOut) rateOut.textContent = rate.toFixed(1) + '%';
      if(tenureOut) tenureOut.textContent = tenure + ' mo';
      if(emiOut) emiOut.textContent = '₹' + formatINR(emi);
      if(principalOut) principalOut.textContent = '₹' + formatINR(amount);
      if(interestOut) interestOut.textContent = '₹' + formatINR(totalInterest);
      if(totalOut) totalOut.textContent = '₹' + formatINR(totalPay);

      // Donut chart: principal vs interest, via conic-gradient
      const chart = widget.querySelector('[data-emi-donut]');
      if(chart){
        const interestPct = Math.max(0, Math.min(100, (totalInterest/totalPay)*100));
        chart.style.background = `conic-gradient(var(--emerald-500) 0% ${100-interestPct}%, var(--gold-500) ${100-interestPct}% 100%)`;
      }
    }

    [amountEl, rateEl, tenureEl].forEach(el=> el.addEventListener('input', render));
    render();
  });
}

/* ---------------- Eligibility Calculator (reusable) ---------------- */
function initEligibilityCalculators(){
  document.querySelectorAll('[data-eligibility-widget]').forEach(widget=>{
    const incomeEl = widget.querySelector('[data-elig-income]');
    const obligationsEl = widget.querySelector('[data-elig-obligations]');
    const tenureEl = widget.querySelector('[data-elig-tenure]');
    const rateEl = widget.querySelector('[data-elig-rate]');
    const resultOut = widget.querySelector('[data-elig-result]');
    const barOut = widget.querySelector('[data-elig-bar]');
    if(!incomeEl) return;

    function render(){
      const income = parseFloat(incomeEl.value) || 0;
      const obligations = parseFloat(obligationsEl?.value) || 0;
      const tenure = parseFloat(tenureEl?.value) || 60;
      const rate = parseFloat(rateEl?.value) || 11;

      // FOIR (Fixed Obligation to Income Ratio) cap at 55%
      const maxEmi = Math.max(0, (income * 0.55) - obligations);
      const r = (rate/12)/100;
      const n = tenure;
      let eligible = 0;
      if(r > 0){
        eligible = maxEmi * (Math.pow(1+r,n) - 1) / (r * Math.pow(1+r,n));
      } else {
        eligible = maxEmi * n;
      }
      if(resultOut) resultOut.textContent = '₹' + formatINR(Math.max(eligible,0));
      if(barOut){
        const pct = Math.min(100, (maxEmi / (income||1)) * 100 / 0.55 * 0.55);
        barOut.style.width = Math.min(100, (maxEmi/(income*0.55||1))*100) + '%';
      }
    }
    [incomeEl, obligationsEl, tenureEl, rateEl].forEach(el=> el && el.addEventListener('input', render));
    render();
  });
}

/* ---------------- Progressive disclosure lead forms ---------------- */
function initProgressiveForms(){
  document.querySelectorAll('[data-progressive-form]').forEach(form=>{
    const steps = Array.from(form.querySelectorAll('[data-step]'));
    const dots = Array.from(form.querySelectorAll('[data-step-dot]'));
    const nextBtns = form.querySelectorAll('[data-step-next]');
    const prevBtns = form.querySelectorAll('[data-step-prev]');
    let current = 0;

    function show(idx){
      steps.forEach((s,i)=> s.classList.toggle('hidden', i!==idx));
      dots.forEach((d,i)=> d.setAttribute('data-active', String(i===idx)));
      current = idx;
    }
    nextBtns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const stepEl = steps[current];
        const requiredInputs = stepEl.querySelectorAll('[required]');
        for(const inp of requiredInputs){
          if(!inp.reportValidity()) return;
        }
        if(current < steps.length-1) show(current+1);
      });
    });
    prevBtns.forEach(btn=>{
      btn.addEventListener('click', ()=>{ if(current>0) show(current-1); });
    });
    if(steps.length) show(0);

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || 'there';
      // NOTE: This is a static, backend-free demo build.
      // In production, POST `data` to your CRM/lead API here
      // (e.g. fetch('/api/leads', {method:'POST', body:data})),
      // or wire to a form service like Formspree/Getform.
      const params = new URLSearchParams({ name: name, product: form.getAttribute('data-product') || '' });
      window.location.href = (form.getAttribute('data-thankyou') || '/thank-you.html') + '?' + params.toString();
    });
  });
}

/* ---------------- Footer year ---------------- */
function initYearStamp(){
  document.querySelectorAll('[data-year]').forEach(el=> el.textContent = new Date().getFullYear());
}

/* ---------------- Mega menu keyboard access ---------------- */
function initMegaMenuA11y(){
  document.querySelectorAll('.nav-group').forEach(group=>{
    const trigger = group.querySelector('[data-mega-trigger]');
    const panel = group.querySelector('.mega-panel');
    if(!trigger || !panel) return;
    trigger.addEventListener('click', (e)=>{
      e.preventDefault();
      const isVisible = panel.style.visibility === 'visible';
      document.querySelectorAll('.mega-panel').forEach(p=>{ p.style.opacity=0; p.style.visibility='hidden'; });
      panel.style.opacity = isVisible ? 0 : 1;
      panel.style.visibility = isVisible ? 'hidden' : 'visible';
    });
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.nav-group')){
      document.querySelectorAll('.mega-panel').forEach(p=>{ p.style.opacity=''; p.style.visibility=''; });
    }
  });
}
