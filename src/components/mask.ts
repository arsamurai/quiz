import IMask from "imask"

const phone = document?.getElementById("phone")

const phoneMaskOptions = {
  mask: "+38(\\000)000-00-00",
}

const masks = {
  phoneMask: () => {
    new (IMask as any)(phone, phoneMaskOptions)
  },
}

if (phone) {
  masks.phoneMask()
}
