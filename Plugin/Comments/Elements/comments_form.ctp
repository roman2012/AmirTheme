<article>
	<h3 class="title ident-bot-5">
		<span>Get In Touch</span>
	</h3>
	<div id="confirm">
		<?php
			$type = $types_for_layout[$node['Node']['type']];

			if ($this->params['controller'] == 'comments') {
				$nodeLink = $this->Html->link(__('Go back to original post') . ': ' . $node['Node']['title'], $node['Node']['url']);
				echo $this->Html->tag('p', $nodeLink, array('class' => 'back'));
			}

			$formUrl = array(
				'plugin' => 'comments',
				'controller' => 'comments',
				'action' => 'add',
				$node['Node']['id'],
			);
			if (isset($parentId) && $parentId != null) {
				$formUrl[] = $parentId;
			}

			echo $this->Form->create('Comment', array('url' => $formUrl,'id'=>'form1'));

				if ($this->Session->check('Auth.User.id')) {
					echo $this->Form->input('Comment.name', array(
						'placeholder' => __('Name'),
						'class' => 'Name',
						'value' => $this->Session->read('Auth.User.name'),
						'readonly' => 'readonly',
					));
					echo $this->Form->input('Comment.email', array(
						'placeholder' => __('Email'),
						'value' => $this->Session->read('Auth.User.email'),
						'readonly' => 'readonly',
					));
					echo $this->Form->input('Comment.website', array(
						'placeholder' => __('Website'),
						'value' => $this->Session->read('Auth.User.website'),
						'readonly' => 'readonly',
					));
					echo $this->Form->input('Comment.body', array('label' => false));
				} else {
					echo $this->Form->input('Comment.name', array('placeholder' => __('Name')));
					echo $this->Form->input('Comment.email', array('placeholder' => __('Email')));
					echo $this->Form->input('Comment.website', array('placeholder' => __('Website')));
					echo $this->Form->input('Comment.body', array('label' => false));
				}

				if ($type['Type']['comment_captcha']) {
					echo $this->Recaptcha->display_form();
				}
			echo $this->Form->end(array(
				'class' => 'button button-border medium yellow',
				'label' => __('Post comment'),
			));
		?>		
	</div>
</article>

