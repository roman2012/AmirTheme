<!DOCTYPE html>
<html lang="en">
	<head>
	<link href='http://fonts.googleapis.com/css?family=Arial:300italic,300,400,400italic,600,600italic,700,700italic|Open+Sans:300italic,300,400,400italic,600,600italic,700,700italic' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Bitter:400,400italic,700|Copse' rel='stylesheet' type='text/css'>
	<?php 
		echo $this->Html->css(array(
			'/css/style',
			'/css/skeleton',
			'/css/font-awesome',
			'/css/imagebox',
			'/css/carousel',
			'/css/fdw-demo',
			'/css/colorbox',
			'/css/elements',
			'/css/superfish',
			'/css/blue-color',
			'/css/forms',
		));
	 ?>
	</head>
	<body>
		<div class="bg-shine">
		  <div class="bodywrapper">
		  	<?php  echo $this->element('header'); ?>
		  	<?php  echo $this->element('page-title'); ?>
		  	<?php  echo $this->Layout->sessionFlash(); ?>
		  	<?php  echo $content_for_layout;?>
		  	<?php  echo $this->element('footer'); ?>
		  </div>
		</div>
	    <?php      
			echo $this->Layout->js();
			echo $this->Html->script(array(
				'/js/jquery.js',
				'/js/jquery.easing.1.3',
				'/js/jquery.responsivemenu',
				'/js/superfish',
				'/js/nav-small',
				'/js/jquery.flexslider.text',
				'/js/jquery.flex-owl-slider-min',
				'/js/jquery.elastislide',
				'/js/jquery-hover-effect',
				'/js/jquery.colorbox-min',
				'/js/tooltip',
				'/js/jquery.tipsy',
				'/js/jquery.ui.totop',
				'/js/jquery.isotope.min',
				'/js/popover',
				'/js/imagebox.min',
				'/js/script',
				'/js/custom',
			));			
			echo $this->Blocks->get('script');
			echo $this->Blocks->get('scriptBottom');
			echo $this->Js->writeBuffer();
		?>
	</body>
</html>