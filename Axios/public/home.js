try {
  document.getElementById("Signup").addEventListener("click", () => {
    const newpage = "../signup.html";
    let fullurl = newpage //+ "?username=" + encodeURIComponent(urlusername);
    window.location.href = fullurl;
  });

  document.getElementById("Login").addEventListener("click", () => {
    const newpage = "../login.html";
    let fullurl = newpage //+ "?username=" + encodeURIComponent(urlusername);
    window.location.href = fullurl;
  });
} catch (error) {
  console.log(error);
}
