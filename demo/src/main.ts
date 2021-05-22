import {BlitFlasher} from 'blitflash';

const connect = document.querySelector('#connect')! as HTMLButtonElement;
const disconnect = document.querySelector('#disconnect')! as HTMLButtonElement;
const status = document.querySelector('#status')! as HTMLButtonElement;
const reset = document.querySelector('#reset')! as HTMLButtonElement;
const list = document.querySelector('#list')! as HTMLButtonElement;

const statusText = document.querySelector('#status_text')! as HTMLDivElement;
const listContent = document.querySelector('#list-content')!;

let blitflash: BlitFlasher;

connect.addEventListener('click', async () => {
  const port = await navigator.serial.requestPort();
  blitflash = new BlitFlasher(port);
  await blitflash.open();
  connect.disabled = true;
  disconnect.disabled = false;
  status.disabled = false;
  reset.disabled = false;
  list.disabled = false;
  const blitStatus = await blitflash!.status();
  statusText.innerText = blitStatus;
});

disconnect.addEventListener('click', async () => {
  await blitflash.close();
  connect.disabled = false;
  disconnect.disabled = true;
  status.disabled = true;
  reset.disabled = true;
  list.disabled = true;
});

reset.addEventListener('click', async() => {
  await blitflash.reset();
  const status = await blitflash!.status();
  statusText.innerText = status;
});

status.addEventListener('click', async () => {
  const status = await blitflash!.status();
  statusText.innerText = status;
});

list.addEventListener('click', async () => {
  const blitRecords = await blitflash!.list();
  blitRecords.forEach((record) => {
     const tr = document.createElement('tr');

     let td = document.createElement('td');
     td.innerText = record.meta?.title || '';
     tr.appendChild(td);

     td = document.createElement('td');
     td.innerText = record.meta?.description || '';
     tr.appendChild(td);

     td = document.createElement('td');
     td.innerText = record.meta?.author || '';
     tr.appendChild(td);

     td = document.createElement('td');
     td.innerText = record.meta?.date || '';
     tr.appendChild(td);

     td = document.createElement('td');
     td.innerText = record.meta?.version || '';
     tr.appendChild(td);

     listContent.appendChild(tr);
  });
});
