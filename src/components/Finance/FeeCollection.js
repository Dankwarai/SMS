export function renderFeeCollection(onCancel, onSave) {
  const container = document.createElement('div');
  container.className = 'fee-collection-container animate-fade-in';
  container.style.padding = '2rem';
  container.style.maxWidth = '1000px';
  container.style.margin = '0 auto';

  container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <h1>Collect Fee 💳</h1>
      <button id="cancel-btn" class="text-muted">Cancel</button>
    </div>
    
    <div class="finance-grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
      <!-- Payment Form -->
      <div class="card animate-slide-in">
        <h3 style="margin-bottom: 1.5rem;">Payment Details</h3>
        <form id="fee-form">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Student ID / Name</label>
            <input type="text" class="form-control" id="student-input" placeholder="Search student..." required>
          </div>
          
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Fee Type</label>
            <select class="form-control" id="fee-type">
              <option value="Tuition Fee">Tuition Fee</option>
              <option value="Transport Fee">Transport Fee</option>
              <option value="Exam Fee">Exam Fee</option>
              <option value="Library Fine">Library Fine</option>
            </select>
          </div>
          
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Amount ($)</label>
            <input type="number" class="form-control" id="amount-input" value="1200" required>
          </div>
          
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Payment Mode</label>
            <div class="flex gap-4" style="margin-top: 0.5rem;">
              <label class="flex items-center gap-2">
                <input type="radio" name="mode" value="Cash" checked> Cash
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" name="mode" value="Card"> Card
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" name="mode" value="Online"> Online
              </label>
            </div>
          </div>
          
          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label class="form-label">Remarks</label>
            <textarea class="form-control" rows="2"></textarea>
          </div>
          
          <button type="submit" class="btn-primary" style="width: 100%;">Process Payment & Print Receipt</button>
        </form>
      </div>
      
      <!-- Receipt Preview -->
      <div class="animate-slide-in" style="animation-delay: 0.1s;">
        <h3 style="margin-bottom: 1.5rem;">Live Receipt Preview</h3>
        <div class="invoice-preview" id="receipt-preview" style="position: relative; overflow: hidden;">
          <div style="position: absolute; top: 10px; right: 10px; opacity: 0.1; font-size: 5rem;">🎓</div>
          <div class="invoice-header">
            <h2 style="margin-bottom: 0.5rem; color: var(--color-primary);">SMS Pro School</h2>
            <small style="display: block;">123 Education Lane, Cityville</small>
            <small>Phone: +1 234 567 8900</small>
            
            <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end;">
              <div style="text-align: left;">
                <div style="font-size: 0.8rem; color: #666;">RECEIPT NO</div>
                <div style="font-weight: bold;">#REC-${Math.floor(Math.random() * 10000)}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 0.8rem; color: #666;">DATE</div>
                <div style="font-weight: bold;">${new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
          
          <div style="margin-bottom: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 4px;">
            <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.25rem;">BILLED TO</div>
            <div style="font-size: 1.1rem; font-weight: bold;" id="preview-name">Select Student</div>
            <div id="preview-class" style="font-size: 0.9rem;">Class: -</div>
          </div>
          
          <div class="invoice-row" style="font-weight: bold; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; color: var(--color-text-muted); font-size: 0.9rem;">
            <span>DESCRIPTION</span>
            <span>AMOUNT</span>
          </div>
          
          <div class="invoice-row" style="padding: 1rem 0;">
            <span id="preview-desc">Tuition Fee</span>
            <span id="preview-amount">$1,200.00</span>
          </div>
          
          <div class="invoice-total invoice-row" style="border-top: 2px solid var(--color-primary);">
            <span style="color: var(--color-primary);">TOTAL PAID</span>
            <span id="preview-total" style="color: var(--color-primary); font-size: 1.5rem;">$1,200.00</span>
          </div>
          
          <div style="margin-top: 3rem; text-align: center;">
            <div style="font-family: 'Courier New', monospace; font-size: 0.8rem; color: #666;">Authorized Signature</div>
            <div style="margin-top: 2rem; font-size: 0.8rem; color: #999;">
              Thank you for your payment!
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Live Preview Logic
  const studentInput = container.querySelector('#student-input');
  const amountInput = container.querySelector('#amount-input');
  const typeInput = container.querySelector('#fee-type');

  const previewName = container.querySelector('#preview-name');
  const previewAmount = container.querySelector('#preview-amount');
  const previewTotal = container.querySelector('#preview-total');
  const previewDesc = container.querySelector('#preview-desc');

  function updatePreview() {
    previewName.textContent = studentInput.value || 'Select Student';
    previewDesc.textContent = typeInput.value;
    const amount = parseFloat(amountInput.value || 0).toFixed(2);
    previewAmount.textContent = `$${amount}`;
    previewTotal.textContent = `$${amount}`;
  }

  studentInput.addEventListener('input', updatePreview);
  amountInput.addEventListener('input', updatePreview);
  typeInput.addEventListener('change', updatePreview);

  // Form Submit
  const form = container.querySelector('#fee-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Processing...';
    btn.disabled = true;

    setTimeout(() => {
      // Mock Print
      const printWindow = window.open('', '', 'width=600,height=800');
      const receiptHtml = container.querySelector('#receipt-preview').outerHTML;
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Receipt</title>
            <style>
              body { font-family: sans-serif; padding: 2rem; }
              .invoice-preview { border: 1px solid #ddd; padding: 2rem; border-radius: 8px; }
              .invoice-header { border-bottom: 2px dashed #ddd; padding-bottom: 1rem; margin-bottom: 1rem; }
              .invoice-row { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
              .invoice-total { border-top: 2px solid #000; padding-top: 1rem; margin-top: 1rem; font-weight: bold; }
            </style>
          </head>
          <body>
            ${receiptHtml}
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `);
      printWindow.document.close();

      alert('Payment processed successfully!');
      if (onSave) onSave();
    }, 1000);
  });

  container.querySelector('#cancel-btn').addEventListener('click', () => {
    if (onCancel) onCancel();
  });

  return container;
}
