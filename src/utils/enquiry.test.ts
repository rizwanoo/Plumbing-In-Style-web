import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_ENQUIRY_FORM,
  formatInstagramBrief,
  sanitizeField,
  validateEnquiryForm,
} from './enquiry';
import { normalizeRoute } from './router';

test('normalizeRoute maps valid routes and defaults unknown paths to home', () => {
  assert.equal(normalizeRoute('/'), '/');
  assert.equal(normalizeRoute('/services/'), '/services');
  assert.equal(normalizeRoute('/about'), '/about');
  assert.equal(normalizeRoute('/about-work'), '/about');
  assert.equal(normalizeRoute('/contact'), '/contact');
  assert.equal(normalizeRoute('/unknown-page'), '/');
});

test('validateEnquiryForm catches missing required fields', () => {
  const errors = validateEnquiryForm(INITIAL_ENQUIRY_FORM);
  assert.ok(errors.fullName);
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.state);
  assert.ok(errors.city);
  assert.ok(errors.sector);
  assert.ok(errors.service);
  assert.ok(errors.description);
});

test('validateEnquiryForm passes for complete valid NY residential enquiry', () => {
  const errors = validateEnquiryForm({
    fullName: 'Jordan Mercer',
    email: 'jordan@example.com',
    phone: '(914) 555-0192',
    preferredContact: 'Instagram DM',
    state: 'NY',
    city: 'White Plains',
    sector: 'Residential',
    service: 'Renovations',
    description: 'Primary bathroom shower valve and vanity plumbing upgrade.',
    honeypot: '',
  });
  assert.deepEqual(errors, {});
});

test('validateEnquiryForm blocks filled honeypot field', () => {
  const errors = validateEnquiryForm({
    ...INITIAL_ENQUIRY_FORM,
    honeypot: 'spam-bot-value',
  });
  assert.ok(errors.honeypot);
});

test('sanitizeField strips angle brackets and trims whitespace', () => {
  assert.equal(sanitizeField('  <script>Kitchen</script>  '), 'scriptKitchen/script');
});

test('formatInstagramBrief produces structured summary for Instagram DM', () => {
  const brief = formatInstagramBrief({
    fullName: 'Alex Rivera',
    email: 'alex@example.com',
    phone: '201-555-0144',
    preferredContact: 'Instagram DM',
    state: 'NJ',
    city: 'Hoboken',
    sector: 'Commercial',
    service: 'Installations',
    description: 'Installing two commercial washroom faucets and shut-off valves.',
    honeypot: '',
  });
  assert.match(brief, /Commercial — Installations/);
  assert.match(brief, /Hoboken, New Jersey \(NJ\)/);
  assert.match(brief, /Alex Rivera/);
});
