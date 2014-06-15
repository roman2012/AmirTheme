<!-- Header -->
<header>
  <div class="row-1">
    <div class="container">
      <div class="sixteen columns">
        <!-- Logo -->
        <div class="logo fleft"> <a href="#" title="Aura" rel="home"> <?php  echo $this->Html->image('../images/logo.png', array('alt'=> 'altText')); ?> </a> </div>
        <!-- Search Field -->
        <div class="search-header">
          <form class="searchform" method="get" action="http://owltemplates.com/demo/website/aura/.">
            <input name="s" type="text" placeholder="" />
          </form>
        </div>
        <!-- menu -->
        <nav  id = "main-nav-menu">
        <?php echo $this->Custom->menu('main', array('dropdown' => true)); ?>
<!--           <ul class="sf-menu">
            <li><a href="index.html">Home</a>
              <ul>
                <li><a href="index.html">Home 1</a></li>
                <li><a href="index2.html">Home 2</a></li>
                <li><a href="index3.html">Home 3</a></li>
              </ul>
            </li>
            <li class="active"><a href="about.html">About</a>
              <ul>
                <li><a href="about.html">About</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="features.html">Features</a></li>
                <li><a href="team.html">Team</a></li>
                <li><a href="product-price.html">Product Price</a></li>
                <li><a href="left-sidebar.html">Left Sidebar</a></li>
                <li><a href="right-sidebar.html">Right Sidebar</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="blog-single.html">Blog Details</a></li>
                <li><a href="portfolio3.html">Portfolio</a>
                  <ul>
                    <li><a href="portfolio2.html">Two Column</a></li>
                    <li><a href="portfolio3.html">Three Column</a></li>
                    <li><a href="portfolio4.html">Four Column</a></li>
                    <li><a href="portfolio-single.html">Portfolio Single</a></li>
                  </ul>
                </li>
                <li><a href="faq.html">FAQs</a></li>
                <li><a href="sitemap.html">Site Map</a></li>
                <li><a href="404-page.html">404 Page</a></li>
              </ul>
            </li>
            <li><a href="elements.html">Elements</a>
              <ul>
                <li><a href="elements.html">Elements</a></li>
                <li><a href="price.html">Price</a></li>
                <li><a href="headings.html">Headings</a></li>
                <li><a href="column.html">Columns Layout</a></li>
              </ul>
            </li>
            <li><a href="blog.html">Blog</a>
              <ul>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="blog-single.html">Blog Details</a></li>
              </ul>
            </li>
            <li><a href="portfolio3.html">Portfolio</a>
              <ul>
                <li><a href="portfolio2.html">Two Column</a></li>
                <li><a href="portfolio3.html">Three Column</a></li>
                <li><a href="portfolio4.html">Four Column</a></li>
                <li><a href="portfolio-single.html">Portfolio Single</a></li>
              </ul>
            </li>
            <li><a href="contact.html">Contact</a></li>
          </ul> -->
        </nav>
        <!-- end menu -->
        <select id = "responsive-main-nav-menu" onchange = "javascript:window.location.replace(this.value);">
        </select>
      </div>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</header>