<?php 
	$type = $types_for_layout[$this->Nodes->field('type')];	


	if ($this->request->params['action'] != 'view' && $type['Type']['comment_status']) {
		$commentCount = '';
		if ($this->Nodes->field('comment_count') == 0) {
			$commentCount = __d('croogo', 'Leave a comment');
		} elseif ($this->Nodes->field('comment_count') == 1) {
			$commentCount = $this->Nodes->field('comment_count') . ' ' . __d('croogo', 'Comment');
		} else {
			$commentCount = $this->Nodes->field('comment_count') . ' ' . __d('croogo', 'Comments');
		}
		$commentCount =  $this->Html->link($commentCount, $this->Html->url($this->Nodes->field('url'), true) . '#comments');
	}

	 
 ?>
<header>
	<div class="date">
		<?php 
			if ($type['Type']['format_show_date']) {				
				echo $this->Html->tag('span', $this->Time->format('d', $this->Nodes->field('created'), null, Configure::read('Site.timezone')), array('class' => 'day'));
				echo $this->Html->tag('span', $this->Time->format('M', $this->Nodes->field('created'), null, Configure::read('Site.timezone')), array('class' => 'month'));
			}
		 ?>
	</div>
	<h2 class="entry-title fleft">
		<?php echo $this->Html->link($this->Nodes->field('title'), $this->Nodes->field('url')); ?>
	</h2>
	<div class="post-meta">
		<div class="fleft">
			<?php 
				if ($type['Type']['format_show_author']) {
					?>
					<i class="icon-user"></i>
					<?php 
					if ($this->Nodes->field('User.website') != null) {
						$author = $this->Html->link($this->Nodes->field('User.name'), $this->Nodes->field('User.website'));
					} else {
						$author = $this->Nodes->field('User.name');
					}
					echo $this->Html->tag('a', $author);
				}
			 ?>
			<i class="icon-eye-open"></i> 
			<a href="#"> 16 Views</a> 
			<i class="icon-comments-alt"></i> 
			<a href="#">
				<?php echo $commentCount;?>				
			</a> 
			<i class="icon-tag"></i> 
			<a href="#"> template,</a> 
			<a href="#"> wordpress,</a> 
			<a href="#"> premium</a> 
		</div>
		
	</div>
</header>