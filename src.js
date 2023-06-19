const fetchData = async () => {
    try {
      const response = await fetch(
        'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json'
      );
      const data = await response.json();

      data.forEach((post, i) => {
        const date = new Date(post.date);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', {
          month: 'long',
        }).format(date);
        const year = date.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;

        const headingElement = document.getElementById(`heading${i + 1}`);
        const imageLinkElement = document.getElementById(
          `image${i + 1}link`
        );
        const imageElement = document.getElementById(`image${i + 1}`);
        const titleElement = document.getElementById(`title${i + 1}`);
        const authorElement = document.getElementById(`author${i + 1}`);
        const dateElement = document.getElementById(`date${i + 1}`);

        if (i === 2) {
          headingElement.innerHTML =
            post._embedded['wp:term'][1][0].name.toUpperCase();
        } else {
          headingElement.innerHTML =
            post._embedded['wp:term'][3][0].name.toUpperCase();
        }
        imageLinkElement.href = post.link;
        imageElement.src = post.featured_media;
        titleElement.innerHTML = post.title.rendered;
        titleElement.href = post.link;
        authorElement.innerHTML = post._embedded.author[0].name;
        authorElement.href = post._embedded.author[0].link;
        dateElement.innerHTML = formattedDate;
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };
  fetchData();