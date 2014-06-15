<?php $this->Nodes->set($node); ?>

<div class="fleft">
	<div class="eleven columns">
		<div class="post-border-right">
				<article class="post-holder">
					<?php 
						echo $this->Nodes->info(); 
						echo $this->Nodes->body();
						$this->Nodes->moreInfo();
					?>
				</article>						
		</div>
		<div id="comments" class="node-comments">
		<?php
			$type = $types_for_layout[$this->Nodes->field('type')];

			if ($type['Type']['comment_status'] > 0 && $this->Nodes->field('comment_status') > 0) {
				echo $this->element('Comments.comments');
			}

			if ($type['Type']['comment_status'] == 2 && $this->Nodes->field('comment_status') == 2) {
				echo $this->element('Comments.comments_form');
			}
		?>
		</div>
	</div>
</div>








