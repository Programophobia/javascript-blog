'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');


  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);


  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

  console.log(event);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.list.tags';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {
    /* get the article id */

    const articleId = article.getAttribute('id'); //I think I can also do: const articleId = optArticleSelector.getAttribute ('id') ??

    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; 
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
    
    //Cwiczenie
    //titleList.insertAdjacentHTML("afterend", linkHTML); 
  }
  console.log(html);
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

//TAGS

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log(tagList);

    /* make html variable with empty string */
    let html = '';
    
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li><br>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
    console.log(html);
  }
  /* [NEW] find list of tags in right column */
  const tagListRight = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  //tagListRight.innerHTML = allTags.join(' ');

  /*[NEW] create variable for all links HTML code*/
  let allTagsHTML = '';

  /*[NEW] START LOOP: for each tag in allTags*/
  for(let tag in allTags){
    /*[NEW] generate code of link and add it to allTagsHTML*/
    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')</a></li>';
  } //NEW END LOOP: for each tag in allTags

  /* [NEW] add html from allTagsHTML to taglist*/
  tagListRight.innerHTML = allTagsHTML;

  console.log(allTags);
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */ 
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); 

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let acvtiveTag of activeTags) {

    /* remove class active */
    acvtiveTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTags = document.querySelectorAll('a[href="' + href + '"]'); //nie rozumiem tego
  console.log(hrefTags);

  /* START LOOP: for each found tag link */
  for (let hrefTag of hrefTags) {

    /* add class active */
    hrefTag.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(titleClickHandler);
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('a[href^="#tag-"]'); 
  /* START LOOP: for each link */
  for (let tagLink of allTagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    console.log(addClickListenersToTags);
  }
}
addClickListenersToTags();
console.log(generateTitleLinks);

//AUTHORS

function generateAuthors() {
  const authors = document.querySelectorAll(optArticleSelector);
  for (let author of authors) {
    const authorList = author.querySelector(optArticleAuthorSelector);
    console.log(authorList);
    const articleAuthor = author.getAttribute('data-author');
    const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    console.log(linkHTML);
    authorList.innerHTML = linkHTML;
  } 
}
generateAuthors();
console.log(generateAuthors); 

function authorClickHandler(event) {
/* prevent default action for this event */ 
  event.preventDefault();
  console.log(event.preventDefault);

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', ''); 

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let acvtiveAuthor of activeAuthors) {

    /* remove class active */
    acvtiveAuthor.classList.remove('active');
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const hrefAuthors = document.querySelectorAll('a[href="' + href + '"]'); 
  console.log(hrefAuthors);

  /* START LOOP: for each found author link */
  for (let hrefAuthor of hrefAuthors) {

    /* add class active */
    hrefAuthor.classList.add('active');
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
  console.log(generateTitleLinks);
}
console.log(authorClickHandler);

function addClickListenersToAuthors(){
  /* find all links to authors */
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]'); 
  /* START LOOP: for each link */
  for (let authorLink of allAuthorLinks){
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
console.log('addClickListenersToAuthors');