import '../css/bacon.pcss'

interface BaconInterface {
  container: HTMLDivElement;
  template: HTMLImageElement;
  cloneButton: HTMLButtonElement;
  appendLocation: HTMLElement;
}

const baconContainer = document.getElementById(
  'bacon-container'
) as HTMLDivElement

const bacon: BaconInterface = {
  container: baconContainer,
  template: baconContainer.querySelector('section > img') as HTMLImageElement,
  cloneButton: baconContainer.querySelector(
    'section > button[type="button"]'
  ) as HTMLButtonElement,
  appendLocation: baconContainer.querySelector(
    'section:last-child'
  ) as HTMLElement,
}

function addMoreBacon (): void {
  const clonedBacon = bacon.template.cloneNode() as HTMLImageElement

  bacon.appendLocation.appendChild(clonedBacon)

  clonedBacon.scrollIntoView({
    behavior: 'smooth',
  })
}

bacon.cloneButton.addEventListener('click', addMoreBacon)
