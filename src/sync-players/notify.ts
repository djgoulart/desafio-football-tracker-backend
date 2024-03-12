export const sendWebhookNotification = async (
  webhookUrl: string,
  data: string,
) => {
  return fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
