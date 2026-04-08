import QRCode from "qrcode"

export async function generateQRCode(userId: string): Promise<string> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000"
  const url = `${baseUrl}/store/scan/${userId}`
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    width: 300,
    margin: 2,
  })
}
