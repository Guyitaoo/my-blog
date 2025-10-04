// gallery.js
document.addEventListener('DOMContentLoaded', function() {
  // 为所有图册项添加点击事件
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
      const src = this.getAttribute('data-src');
      const caption = this.getAttribute('data-caption');
      openModal(src, caption);
    });
  });

  // 按ESC键关闭模态框
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  // 窗口大小改变时重新居中内容
  window.addEventListener('resize', function() {
    if (document.getElementById("myModal") && document.getElementById("myModal").style.display === "block") {
      centerModalContent();
    }
  });
});

function openModal(src, caption) {
  // 确保模态框存在
  let modal = document.getElementById("myModal");
  if (!modal) {
    createModal();
    modal = document.getElementById("myModal");
  }
  
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("modalCaption");
  
  modal.style.display = "block";
  modalImg.src = src;
  captionText.textContent = caption;
  
  // 确保图片加载完成后居中显示
  modalImg.onload = function() {
    centerModalContent();
  };
  
  // 如果图片已经缓存，也需要居中
  if (modalImg.complete) {
    centerModalContent();
  }
}

function createModal() {
  const modalHTML = `
    <div id="myModal" class="modal">
      <span class="close" onclick="closeModal()">&times;</span>
      <div class="modal-content-container">
        <img class="modal-content" id="img01">
        <div id="modalCaption" class="modal-caption"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // 点击模态框背景也可以关闭
  document.getElementById('myModal').addEventListener('click', function(event) {
    if (event.target === this) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// 居中显示模态框内容
function centerModalContent() {
  const modalImg = document.getElementById("img01");
  if (!modalImg || !modalImg.naturalWidth) return;
  
  // 使用flex布局已经居中，这里确保图片正确显示
  const imgAspectRatio = modalImg.naturalHeight / modalImg.naturalWidth;
  const windowAspectRatio = window.innerHeight / window.innerWidth;
  
  // 根据图片和窗口比例调整最大尺寸
  if (imgAspectRatio > windowAspectRatio) {
    // 高图 - 限制高度
    modalImg.style.maxHeight = "80vh";
    modalImg.style.maxWidth = "none";
  } else {
    // 宽图 - 限制宽度
    modalImg.style.maxWidth = "90%";
    modalImg.style.maxHeight = "none";
  }
}