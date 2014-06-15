<?php
$this->set(compact('block'));
$b = $block['Block'];
$class = 'block block-' . $b['alias'];
if ($block['Block']['class'] != null) {
	$class .= ' ' . $b['class'];
}
?>

	<div class="widget">
		<?php if ($b['show_title'] == 1):  ?>
			<h4 class="title ident-bot-3">
				<?php echo $b['title']; ?>
			</h4>
		<?php endif; ?>
		<?php echo $this->Layout->filter($b['body']); ?>
	</div>

