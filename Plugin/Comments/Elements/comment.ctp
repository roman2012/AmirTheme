<div class="comment-box">
<div id="comment-<?php echo $comment['Comment']['id']; ?>" class="well comment<?php if ($node['Node']['user_id'] == $comment['Comment']['user_id']) { echo ' author'; } ?>">
	<div class="parent">
		<div class="img-border-bg ident-right-2 fleft"><?php echo $this->Html->image('http://www.gravatar.com/avatar/' . md5(strtolower($comment['Comment']['email'])) . '?s=32', array('class' => 'img-rounded img-polaroid')) ?></div>
		<h5 >
		<?php
			if ($comment['Comment']['website'] != null) {
				echo $this->Html->link($comment['Comment']['name'], $comment['Comment']['website'], array('target' => '_blank'));
			} else {
				echo $comment['Comment']['name'];
			}
		?>
		</h5>
		<span ><?php echo __('said on %s', $this->Time->format(Configure::read('Comment.date_time_format'), $comment['Comment']['created'], null, Configure::read('Site.timezone'))); ?></span>
		<div >
			<?php echo nl2br($this->Text->autoLink($comment['Comment']['body'])); ?>
		</div>
	</div>

	<div class="comment-reply clearfix">
	<?php
		if ($level <= Configure::read('Comment.level')) {
			echo $this->Html->link(__('Reply'), array(
				'plugin' => 'comments',
				'controller' => 'comments',
				'action' => 'add',
				$node['Node']['id'],
				$comment['Comment']['id'],
			), array(
				'class' => 'pull-right',
				'icon' => 'comment',
			));
		}
	?>
	</div>

	<?php
		if (isset($comment['children']) && count($comment['children']) > 0) {
			foreach ($comment['children'] as $childComment) {
				echo $this->element('Comments.comment', array('comment' => $childComment, 'level' => $level + 1));
			}
		}
	?>
</div>
	
</div>

