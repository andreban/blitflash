import {BlitFlasher} from 'blitflash';

const connect = document.querySelector('#connect')! as HTMLButtonElement;
const disconnect = document.querySelector('#disconnect')! as HTMLButtonElement;
const status = document.querySelector('#status')! as HTMLButtonElement;
const reset = document.querySelector('#reset')! as HTMLButtonElement;
const list = document.querySelector('#list')! as HTMLButtonElement;
const flash = document.querySelector('#flash')! as HTMLButtonElement;
const sd = document.querySelector('#sd')! as HTMLButtonElement;

const statusText = document.querySelector('#status_text')! as HTMLDivElement;
const listContent = document.querySelector('#list-content')!;

if (BlitFlasher.supportsWebSerial()) {
  connect.disabled = false;
}

let blitflash: BlitFlasher | null = null;

connect.addEventListener('click', async () => {
  const port = await BlitFlasher.getOrRequestPort();
  blitflash = new BlitFlasher(port);
  await blitflash.open();
  connect.disabled = true;
  disconnect.disabled = false;
  status.disabled = false;
  reset.disabled = false;
  list.disabled = false;
  flash.disabled = false;
  sd.disabled = false;
  const blitStatus = await blitflash!.status();
  statusText.innerText = blitStatus;
});

disconnect.addEventListener('click', async () => {
  await blitflash?.close();
  blitflash = null;
  connect.disabled = false;
  disconnect.disabled = true;
  status.disabled = true;
  reset.disabled = true;
  list.disabled = true;
  flash.disabled = true;
  sd.disabled = true;
});

reset.addEventListener('click', async() => {
  if (blitflash === null) {
    console.error('Not Connected');
    return;
  }
  await blitflash.reset();
  const status = await blitflash!.status();
  statusText.innerText = status;
});

status.addEventListener('click', async () => {
  if (blitflash === null) {
    console.error('Not Connected');
    return;
  }
  const status = await blitflash!.status();
  statusText.innerText = status;
});

list.addEventListener('click', async () => {
  if (blitflash === null) {
    console.error('Not Connected');
    return;
  }
  const blitRecords = await blitflash.list();
  listContent.innerHTML = '';
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

flash.addEventListener('click', async() => {
  if (blitflash === null) {
    console.error('Not Connected');
    return;
  }
  const response = await fetch('snake.blit');
  const arrayBuffer = new Uint8Array(await response.arrayBuffer());
  console.log(`Received arrayBuffer with size ${arrayBuffer.byteLength}`);
  try {
    await blitflash.sendFile(arrayBuffer, 'flash', 'snake.blit');
    alert('snake.blit flashed successfully')
  } catch(e) {
    console.error('Error uploading blit file', e);
  }
});

sd.addEventListener('click', async() => {
  if (blitflash === null) {
    console.error('Not Connected');
    return;
  }
  const response = await fetch('snake.blit');
  const arrayBuffer = new Uint8Array(await response.arrayBuffer());
  console.log(`Received arrayBuffer with size ${arrayBuffer.byteLength}`);
  try {
    await blitflash.sendFile(arrayBuffer, 'sd', 'snake.blit', '/');
    alert('snake.blit flashed successfully')
  } catch(e) {
    console.error('Error uploading blit file', e);
  }
});
