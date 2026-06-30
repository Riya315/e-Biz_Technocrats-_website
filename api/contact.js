// Vercel Serverless Function for contact form
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
  try {
    const { name, email, phone, message } = req.body;
    console.log("Contact form received:", { name, email, phone, message });
    // Insert into MySQL database
  const [result] = await pool.execute(
    'INSERT INTO contacts (name, email, phone, message) VALUES (?,?,?,?)',
    [name, email, phone, message]
  );
  console.log('Inserted row ID:', result.insertId);
    return res.status(200).json({ success: true, message: "Message received" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
