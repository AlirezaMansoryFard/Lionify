//! Get And Run Artists Info
class Artist {
  constructor(
    artistName,
    followers,
    following,
    favoriteRate,
    musicViews,
    profileUrl,
    coverUrl,
    songs,
    artistList,
  ) {
    this.id = Math.floor(new Date().getTime() * Math.random());
    this.artistName = artistName;
    this.followers = followers;
    this.following = following;
    this.favoriteRate = favoriteRate;
    this.musicViews = musicViews;
    this.profileUrl = profileUrl;
    this.coverUrl = coverUrl;
    this.musics = songs;
    this.artistList = artistList;
  }
  //* Show Artist Information Method
  showArtistInfo(artist) {
    const coverArtist = document.querySelector(".singer__cover");
    const profileArtist = document.querySelector(".singer__profile-box");
    const nameArtist = document.querySelector(".singer__profile-title");
    const followersArtistValue = document.getElementById("Followers");
    const followingArtistValue = document.getElementById("following");
    const favoriteRateArtist = document.getElementById("favorite");
    const viewMusicArtist = document.getElementById("viewMusic");
    const musicList = document.getElementById("MusicList");
    //? Cover
    coverArtist.innerHTML = `<img
  class="singer__cover-image"
  src="${artist.coverUrl}" />`;
    //? Profile
    profileArtist.innerHTML = `<img
  class="singer__profile-img"
  src="${artist.profileUrl}" />`;
    //? Artist Name
    nameArtist.textContent = artist.artistName;
    //? Followers
    followersArtistValue.textContent = artist.followers;
    //? Following
    followingArtistValue.textContent = artist.following;
    //? Favorite Rate
    favoriteRateArtist.textContent = artist.favoriteRate;
    //? View Musics
    viewMusicArtist.textContent = artist.musicViews;
    //? Music List
    musicList.innerHTML = "";
    artist.musics.forEach((music) => {
      const createItemElm = document.createElement("li");
      createItemElm.className = "main__content-item";
      createItemElm.innerHTML = `<div class="main__content-details">
      <div class="main__content-box">
        <div class="main__content-img">
          <img
            class="main__content-pic"
            src="${music.cover}" />
          <div class="main__content-play plays${music.id}">
            <i
              class="fa-solid fa-play play${music.id} main__content-play-icon"></i>
          </div>
        </div>
        <span class="main__content-text">${music.name}</span>
      </div>
      <div class="main__content-times">
        <span class="main__content-time">${music.time}</span>
      </div>
      <div class="main__content-times">
        <span class="main__content-time">$${music.price}</span>
      </div>
    </div>
    <div class="main__content-cart">
       <div class="main__content-times card${music.id}" >
        <span class="main__content-card">ADD TO CARD</span>
      </div>
      <div class="main__content-times favorite${music.id}">
        <i class="fa-regular fa-heart main__content-icon"></i>
      </div>
    </div>`;
      musicList.append(createItemElm);

      //? Event Play Music
      const playIcon = createItemElm.querySelector(`.plays${music.id}`);
      playIcon.addEventListener("click", () => {
        this.playMusic(music.source, music.id);
      });

      //? Event Add To Card
      const addToCardIcon = createItemElm.querySelector(`.card${music.id}`);
      addToCardIcon.addEventListener("click", () => {
        this.addToCard(music.id, artist.id);
      });

      //?Event Add To Favorite
      const addToFavoriteIcon = createItemElm.querySelector(
        `.favorite${music.id}`,
      );
      addToFavoriteIcon.addEventListener("click", () => {
        this.addToFavorite(music.id, artist.id);
      });
    });
  }
  //* Find Artist Method
  findArtist(artistId) {
    return this.artistList.Artists.find((event) => event.id == artistId);
  }
  //* Find Musics Method
  findMusics(musicId, artistId) {
    const findArtist = this.findArtist(artistId);
    return findArtist.musics.find((event) => event.id == musicId);
  }
  //* Add To Card Method
  addToCard(musicId, artistId) {
    const findMusics = this.findMusics(musicId, artistId);
    App.getCard().add(findMusics);
  }

  //* Add To Favorite Method
  addToFavorite(musicId, artistId) {
    const findMusics = this.findMusics(musicId, artistId);
    App.getFavorite().add(findMusics);
  }
  //* Play Music Method
  playMusic(source, id) {
    const footer = document.querySelector(".footer");
    footer.innerHTML = "";
    footer.style.display = "block";
    const allMusicIcon = document.querySelectorAll(".main__content-play-icon");
    allMusicIcon.forEach((icon) => {
      icon.classList.replace("fa-pause", "fa-play");
    });
    const musicIcon = document.querySelector(`.play${id}`);
    if (musicIcon) {
      musicIcon.classList.replace("fa-play", "fa-pause");
    }

    const createAudioElm = document.createElement("audio");
    createAudioElm.classList.add("footer__audio");
    createAudioElm.setAttribute("controls", "");
    createAudioElm.innerHTML = `<source class="footer__audio-source" type="audio/mpeg" src="${source}">`;
    createAudioElm.play();
    footer.append(createAudioElm);
  }
  //* Other Artist Info
  otherArtistInfo(allArtistInfo) {
    const swiperList = document.getElementById("swiper-wrapper");
    swiperList.innerHTML = "";
    allArtistInfo.forEach((artist, index) => {
      const createArtistSlide = document.createElement("div");
      createArtistSlide.className = "swiper-slide main__swipper-slide";
      createArtistSlide.innerHTML = `<img
    class="w-100 main__swipper-img"
    src="${artist.profileUrl}"/>`;
      swiperList.append(createArtistSlide);

      //? Active First Element When Load Page
      if (index === 0) {
        createArtistSlide.classList.add("active");
      }
      createArtistSlide.addEventListener("click", (event) => {
        this.createArtistInfoClickHandler(artist.id);
        const allSlideImg = document.querySelectorAll(".main__swipper-img");
        //? Delete Active Class
        allSlideImg.forEach((slide) => {
          slide.parentElement.classList.remove("active");
        });
        //? Add Active Class
        event.target.parentElement.classList.add("active");
      });
    });
  }

  //* Create Artist Info Click Handler
  createArtistInfoClickHandler(artistId) {
    const findArtist = this.findArtist(artistId);
    //? Clear Prev Musics From List
    const musicList = document.getElementById("MusicList");
    musicList.innerHTML = "";
    this.showArtistInfo(findArtist);
  }
}

//! Basket
class Basket {
  constructor() {
    this.basketMusics = new Set([]);
    this.musicCookieKey = "Musics";
    this.expireMusicCookie = 24 * 3600;
    this.getFromCookie();
  }

  //* Find Basket Musics Method
  findBasketMusics(BasketId) {
    return Array.from(this.basketMusics).find((event) => event.id == BasketId);
  }
  //* Add Music Method
  add(music) {
    if (!this.findBasketMusics(music.id)) {
      this.basketMusics.add(music);
      this.showCard();
      this.calculateTotalPrice();
      this.setToCookie();
      new Toast("Added To Basket !").addMessage();
    } else {
      new Toast("This is exist !").removeMessage();
    }
  }
  //* Show Card Method
  showCard() {
    //? Clear Basket List
    const basketList = document.querySelector(".header__card-box");
    basketList.innerHTML = "";
    //? Show Basket Items
    this.basketMusics.forEach((basket) => {
      const musicItemElm = document.createElement("div");
      musicItemElm.className = `header__card-item item${basket.id}`;
      musicItemElm.innerHTML = `<div class="header__card-info">
    <img class="header__card-img" src="${basket.cover}">
    <span class="header__card-text">${basket.name}</span>
  </div>
  <span class="header__card-price">$${basket.price}</span>`;
      basketList.prepend(musicItemElm);
      //* Remove Music From Card
      musicItemElm.addEventListener("click", (event) => {
        const musicIdNumber = event.currentTarget.classList[1].slice(4);
        this.removeMusicFromCard(musicIdNumber);
      });
    });

    //? Change Number Of Cards
    const basketLength = document.querySelector(".header__links-text");
    basketLength.textContent = this.basketMusics.size;
  }
  //* Remove Music From Card Method
  removeMusicFromCard(musicId) {
    const findMusicIdNumber = Array.from(this.basketMusics).find(
      (item) => item.id == musicId,
    );
    this.basketMusics.delete(findMusicIdNumber);
    this.showCard();
    this.calculateTotalPrice();
    this.setToCookie();
    new Toast("Removed From Card !").removeMessage();
  }
  //* Set Information To Cookie Method
  setToCookie() {
    document.cookie = `${this.musicCookieKey}=${JSON.stringify(
      Array.from(this.basketMusics),
    )};max-age=${this.expireMusicCookie}`;
  }
  //* Get Information From Cookie
  getFromCookie() {
    const getCookie = document.cookie;
    if (getCookie) {
      const splitCookie = getCookie.split(";");
      const trimCookie = splitCookie.map((data) => data.trim());
      const findIndex = trimCookie.findIndex((event) =>
        event.includes(`${this.musicCookieKey}`),
      );
      const parseCookie = JSON.parse(trimCookie[findIndex].split("=")[1]);
      parseCookie.forEach((event) => this.add(event));
    }
  }
  //* Calculate Total Price FUNCTION
  calculateTotalPrice() {
    const totalPrice = Array.from(this.basketMusics).reduce(
      (prevValue, currentValue) => {
        return prevValue + currentValue.price;
      },
      0,
    );
    const totalPriceElm = document.querySelector(".header__card-total-value");

    totalPriceElm.textContent = `$${totalPrice}`;
  }
}

//! Favorite
class Favorite {
  constructor() {
    this.favoriteMusics = new Set([]);
    this.nameStorage = "Favorite Music";
    this.getFromLocalStorage();
  }

  //* Find Favorite Music Method
  findFavoriteMusic(favoriteId) {
    return Array.from(this.favoriteMusics).find(
      (event) => event.id == favoriteId,
    );
  }
  //* Add Favorite Music Method
  add(favorite) {
    if (!this.findFavoriteMusic(favorite.id)) {
      this.favoriteMusics.add(favorite);
      this.showFavorite();
      this.setToLocalStorage();
      new Toast("Added To Favorite !").addMessage();
    } else {
      new Toast("This is added !").removeMessage();
    }
  }
  //* Show Favorite Musics Method
  showFavorite() {
    //? Clear Favorite List
    const favoriteList = document.querySelector(".main__content-inside");
    favoriteList.innerHTML = "";
    //? Show Favorite Items
    this.favoriteMusics.forEach((favorite) => {
      const favoriteItemElm = document.createElement("div");
      favoriteItemElm.className = `main__content-singer item${favorite.id}`;
      favoriteItemElm.innerHTML = `<img class="main__content-singer-img"
     src="${favorite.cover}">
    <span class="main__content-singer-delete">Delete In Favorite</span>`;
      favoriteList.prepend(favoriteItemElm);
      //* Remove Music From Favorite
      favoriteItemElm.addEventListener("click", (event) => {
        const favoriteIdNumber = event.currentTarget.classList[1].slice(4);
        this.removeMusicFromFavorite(favoriteIdNumber);
      });
    });
    //? Show a Text When Music is Not Added
    if (this.favoriteMusics.size == 0) {
      favoriteList.textContent = "There is nothing to show";
    }
  }

  //* Remove Music From Favorite Method
  removeMusicFromFavorite(musicId) {
    const findMusicIdNumber = Array.from(this.favoriteMusics).find(
      (item) => item.id == musicId,
    );
    this.favoriteMusics.delete(findMusicIdNumber);
    this.showFavorite();
    this.setToLocalStorage();
    new Toast("Removed From Favorite !").removeMessage();
  }
  //* Set Informations To Local Storage Method
  setToLocalStorage() {
    localStorage.setItem(
      this.nameStorage,
      JSON.stringify(Array.from(this.favoriteMusics)),
    );
  }
  //* Get Information From Local Storage Method
  getFromLocalStorage() {
    const getStorage = localStorage.getItem(this.nameStorage);
    if (getStorage) {
      const parseStorage = JSON.parse(getStorage);
      parseStorage.forEach((event) => this.add(event));
    }
  }
}

//! Notfication Messages When Click on Add To Card | Favorite | Remove On Basket Buttons
class Toast {
  notficationMessage;
  toastElm;
  toastMessage;
  constructor(message) {
    this.notficationMessage = message;
    this.toastMessage = document.getElementById("toastMessage");
    this.createElement();
  }
  //* Create Element Method
  createElement() {
    this.toastElm = document.createElement("div");
    this.toastElm.classList.add("Toast");
    this.toastElm.textContent = this.notficationMessage;
  }
  //* Add To Basket(Card) | Favorite Method
  addMessage() {
    this.toastElm.setAttribute("id", "addToast");
    this.toastMessage.append(this.toastElm);
    this.clearMessages();
  }

  //* Remove From Basket(Card) | Favorite Method
  removeMessage() {
    this.toastElm.setAttribute("id", "delToast");
    this.toastMessage.append(this.toastElm);
    this.clearMessages();
  }

  //* Clear Messages After 2 Seconds
  clearMessages() {
    setTimeout(() => {
      this.toastElm.remove();
    }, 3000);
  }
}

//! Send Info to Artist Class And Get Object From Artist Class, Finally Store in Array
class ArtistList {
  constructor() {
    this.Artists = [];
  }
  //* Add Artist Method
  addArtist(
    artistName,
    followers,
    following,
    favoriteRate,
    musicViews,
    profileUrl,
    coverUrl,
    songs,
  ) {
    const newArtist = new Artist(
      artistName,
      followers,
      following,
      favoriteRate,
      musicViews,
      profileUrl,
      coverUrl,
      songs,
      this,
    );
    this.Artists.push(newArtist);
    newArtist.showArtistInfo(this.Artists[0]);
    newArtist.otherArtistInfo(this.Artists);
  }
}
//! Show Date & Time on Display
class ShowTimeAndDate {
  constructor() {
    this.getDate();
    this.getTime();
  }
  //* Date & Time Methods
  //? Date Method
  getDate() {
    const newDate = new Date();
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(newDate);
    const dateBoxElm = document.querySelector(".header__item-date-box");
    dateBoxElm.textContent = dateFormatter;
  }

  //? Time Method
  getTime() {
    setInterval(() => {
      const newTime = new Date();
      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(newTime);
      const timeBoxElm = document.querySelector(".header__item-time-box");
      timeBoxElm.textContent = timeFormatter;
    }, 1000);
  }
}
//! It Does What We Need To DO in the Beginning + HTML CODES
class Load {
  constructor() {
    this.artistList = new ArtistList();
    this.basket = new Basket();
    this.favorite = new Favorite();
    this.timeAndDate = new ShowTimeAndDate();
    this.generateArtistList();
    this.showCardClickHandler();
  }
  generateArtistList() {
    //* Amir Tataloo Informotion

    const amirTataloo = [
      {
        id: 1,
        name: "Bi Manam Mishe",
        price: 45,
        cover: "./Music/tataloo/BiManamMishe.webp",
        time: "8:08",
        source: "./Music/tataloo/BiManamMishe.mp3",
      },
      {
        id: 2,
        name: "Eyde Emsal",
        price: 55,
        cover: "./Music/tataloo/eidEmsal.webp",
        time: "4:18",
        source: "./Music/tataloo/eidEmsal.mp3",
      },
      {
        id: 3,
        name: "Shabe Yalda",
        price: 55,
        cover: "./Music/tataloo/shabYalda.webp",
        time: "6:42",
        source: "./Music/tataloo/shabYalda.mp3",
      },
      {
        id: 4,
        name: "Man Bahat Ghahram",
        price: 55,
        cover: "./Music/tataloo/ManBahatGhahram.webp",
        time: "5:46",
        source: "./Music/tataloo/ManBahatGhahram.mp3",
      },
    ];
    this.artistList.addArtist(
      "Amir Tataloo",
      "1,245,233",
      "10",
      "3",
      "11,245,233",
      "./images/tataloo/profile.jpg",
      "./images/tataloo/cover.jpg",
      amirTataloo,
    );
    //* Shadmehr Aghili Informotion

    const shadmehrAghili = [
      {
        id: 5,
        name: "Ghalbe Man",
        price: 45,
        cover: "./Music/shadmehr/GhalbeMan.webp",
        time: "3:19",
        source: "./Music/shadmehr/GhalbeMan.mp3",
      },
      {
        id: 6,
        name: "Ghazi",
        price: 55,
        cover: "./Music/shadmehr/ghazi.webp",
        time: "3:20",
        source: "./Music/shadmehr/ghazi.mp3",
      },
      {
        id: 7,
        name: "Mosafer",
        price: 55,
        cover: "./Music/shadmehr/Mosafer.webp",
        time: "5:13",
        source: "./Music/shadmehr/Mosafer.mp3",
      },
      {
        id: 8,
        name: "Taghdir",
        price: 55,
        cover: "./Music/shadmehr/taghdir.webp",
        time: "4:41",
        source: "./Music/shadmehr/taghdir.mp3",
      },
    ];
    this.artistList.addArtist(
      "Shadmehr Aghili",
      "8,245,233",
      "20",
      "2",
      "55,245,233",
      "./images/shadmehr/profile.jpg",
      "./images/shadmehr/cover.jpg",
      shadmehrAghili,
    );
    //* Shayea Informotion

    const shayea = [
      {
        id: 9,
        name: "Az Aval",
        price: 55,
        cover: "./Music/shayea/azAval.webp",
        time: "3:16",
        source: "./Music/shayea/azAval.mp3",
      },
      {
        id: 10,
        name: "Hame Man",
        price: 55,
        cover: "./Music/shayea/hameMan.webp",
        time: "4:32",
        source: "./Music/shayea/HameMan.mp3",
      },
      {
        id: 11,
        name: "Tangi Nagas",
        price: 55,
        cover: "./Music/shayea/tangiNafas.webp",
        time: "4:26",
        source: "./Music/shayea/tangiNafas.mp3",
      },
      {
        id: 12,
        name: "Vaysin Aghab",
        price: 55,
        cover: "./Music/shayea/vaysinAghab.webp",
        time: "3:31",
        source: "./Music/shayea/vaysinAghab.mp3",
      },
    ];
    this.artistList.addArtist(
      "Mohammad Reza Shayea",
      "2,245,233",
      "1",
      "2",
      "16,245,233",
      "./images/shayea/profile.jpg",
      "./images/shayea/cover.jpg",
      shayea,
    );
    //* Taylor Swift Informotion
    const swift = [
      {
        id: 13,
        name: "Blank Space",
        price: 35,
        cover: "./Music/swift/Blank Space.jpg",
        time: "3:51",
        source: "./Music/swift/Blank Space.mp3",
      },
      {
        id: 14,
        name: "carma",
        price: 45,
        cover: "./Music/swift/carma.jpg",
        time: "3:24",
        source: "./Music/swift/carma.mp3",
      },
      {
        id: 15,
        name: "Miss Americana",
        price: 55,
        cover: "./Music/swift/Miss Americana.jpg",
        time: "3:54",
        source: "./Music/swift/Miss Americana.mp3",
      },
    ];
    this.artistList.addArtist(
      "taylor swift",
      "81,245,233",
      "15",
      "4",
      "35,245,233",
      "./images/Taylor Swift/profile.jpg",
      "./images/Taylor Swift/cover.jpg",
      swift,
    );
  }
  showCardClickHandler() {
    const basketIcon = document.querySelector(".header__links-shop");
    const basketBox = document.querySelector(".header__card");
    basketIcon.addEventListener("click", () => {
      basketBox.classList.toggle("hidden");
    });
  }
}

//! App
class App {
  static init() {
    this.newLoad = new Load();
  }
  static getCard() {
    return this.newLoad.basket;
  }
  static getFavorite() {
    return this.newLoad.favorite;
  }
}
App.init();
