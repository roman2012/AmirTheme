<?php
	$b = $block['Block'];
?>
<?php if ($b['show_title'] == 1) { ?>
	<h3><?php echo $b['title']; ?></h3>
<?php } ?>
	
		<form id="searchform"  method="post" action="javascript: document.location.href=''+Croogo.basePath+'search/q:'+encodeURI($('#searchform #q').val());">
		<?php
			$qValue = null;
			if (isset($this->params['named']['q'])) {
				$qValue = $this->params['named']['q'];
			}
			echo $this->Form->input('q', array(				
				'label' => false,
				'name' => 'q',
				'value' => $qValue,
				'after' => $this->Form->button('Search', array(
					'class' => 'btn',
				))
			));
		?>
		</form>