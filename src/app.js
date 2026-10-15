'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {menu.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded',String(open));
  navigation.classList.toggle('is-open',open);
});
navigation.addEventListener('click', event => {if(event.target.closest('a'))closeMenu();});
document.addEventListener('click', event => {if(!event.target.closest('.site-header'))closeMenu();});
document.addEventListener('keydown', event => {if(event.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
matchMedia('(min-width: 801px)').addEventListener('change', event => {if(event.matches)closeMenu();});

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectAlbum(tab, focus=false) {
  for(const item of tabs) {
    const selected = item===tab;
    item.setAttribute('aria-selected',String(selected));
    item.tabIndex=selected?0:-1;
    document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;
  }
  if(focus) {tab.focus();tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
}
for (const [index,tab] of tabs.entries()) {
  tab.addEventListener('click',()=>selectAlbum(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();selectAlbum(tabs[next],true);}
  });
}
for(const link of document.querySelectorAll('.album-jump'))link.addEventListener('click',()=>selectAlbum(document.getElementById(`tab-${link.dataset.album}`)));

const dialog = document.getElementById('reference-dialog');
let lastTrigger;
for(const trigger of document.querySelectorAll('[data-notice-title]'))trigger.addEventListener('click',()=>{
  lastTrigger=trigger;
  document.getElementById('dialog-title').textContent=trigger.dataset.noticeTitle;
  document.getElementById('dialog-detail').textContent=trigger.dataset.noticeDetail;
  dialog.showModal();
});
for(const button of dialog.querySelectorAll('button'))button.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>lastTrigger?.focus());
