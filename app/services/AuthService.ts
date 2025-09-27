export async function registerApi(formData: any) {
  try {
    
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { error: error.message || "Failed to register" };
  }
}
