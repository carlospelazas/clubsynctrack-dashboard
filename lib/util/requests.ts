
export const get = async (token: string, url: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    if (res.status === 200) {
        const data  = await res.json();
        return data;
      }
    throw new Error(await res.text());
}

export const put = async (token: string, url: string, data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });
  if (res.status === 200) {
      let data = []
      try {
        data  = await res.json();
      } 
      catch {
        data = []
      } 
      return data;
    }
  throw new Error(await res.text());
}

export const del = async (token: string, url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
  if (res.status === 200) {
      return true;
    }
  throw new Error(await res.text());
}

export const postFile = async (token: string, url: string, data: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data
  });
  if (res.status === 201) {
      const data  = await res.json();
      return data;
    }
  throw new Error(await res.text());
}


export const handleFileUpload = async (file: File, token: string, url: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
  } catch (error) {
    throw new Error("Unknown error");
  }
};

export const post = async (token: string, url: string, data:any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    
  });
  if (res.status === 201) {
      const data  = await res.json();
      return data;
    }
  throw new Error(await res.text());
}