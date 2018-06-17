<template>
  <div id="app" class="container">
    <h1 class="header">Phonebook</h1>
    <div class="cnt_inputs">

    <label class="input_label">Name*</label>

      <input type="text" class="inner_input" placeholder="Name" v-model="name">

    

    <label class="input_label">Lastname*</label>

      <input type="text" class="inner_input" placeholder="Lastname" v-model="lastname">

    


    <label class="input_label">Number*</label>

      <input type="text" class="inner_input" placeholder="Number" v-model="number" @keyup.enter="submitContact()">

    

    <button class="add_btn" @click="submitContact()">Add</button>

    </div>
    


    <div class="contact_list">
      <div class="inner_cnt">
        <h1 class="list_header">Contact List</h1>
        <div class="search_box">
          <label class="input_label">Search: </label>
          <input class="inner_input" type="text" placeholder="Search contacts (Last name)" v-model="search">
        </div>
      </div>
      <ul>
        <li class="contact_listing" v-for="contact of filteredContacts" v-bind:key="contact['.key']">
          <div class="contact_listing_inner" v-if="!contact.edit">
            <div class="listing_inner_first">
              <span class="listing_info">Name: {{contact.name}}</span>
              <span class="listing_info">Lastname: {{contact.lastname}}</span>
              <span class="listing_info">Number: {{contact.number}}</span>
            </div>

            <div class="listing_inner_second">
              <button class="listing_btn" @click="setEditContact(contact['.key'])">Edit</button>
              <button class="listing_btn" @click="removeContact(contact['.key'])">Delete</button>
              
            </div>
          </div>
          <div class="edit_contact" v-else>
            <input class="inner_input_edit" type="text" v-model="contact.name">
            <input class="inner_input_edit" type="text" v-model="contact.lastname">
            <input class="inner_input_edit" type="text" v-model="contact.number" @keyup.enter="saveEdit(contact)">
            <button class="inner_edit_btn" @click="saveEdit(contact)">Save</button>
            <button class="inner_edit_btn" @click="cancelEdit(contact['.key'])">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { contactsRef } from './firebase'

export default {
  name: 'app',
  data () {
    return {
        name: '',
        lastname: '',
        number: '',
        search: ''

    }
  },
  firebase: {
    contacts: contactsRef
  },
  methods: {
    submitContact() {
      contactsRef.push({name: this.name, lastname: this.lastname, number: this.number, edit: false})
      this.name = ''
      this.lastname = ''
      this.number = ''
    },
    removeContact(key) {
      contactsRef.child(key).remove();
    },
    setEditContact(key) {
      contactsRef.child(key).update({edit: true})
    },
    cancelEdit(key) {
      contactsRef.child(key).update({edit: false})
    },
    saveEdit(person) {
      const key = person['.key']
      contactsRef.child(key).set({name: person.name, lastname: person.lastname, number: person.number, edit: false})
    }
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter((contact) => {
        return contact.lastname.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style>


</style>
















