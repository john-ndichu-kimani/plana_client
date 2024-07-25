import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statcount',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statcount.component.html',
  styleUrl: './statcount.component.css'
})
export class StatcountComponent implements OnInit {
  logos = [
    {
      src: '/assets/moringa.png', alt: 'Moringa',
      name:"Moringa School"
    },
    { src: '/assets/AT.png', alt: "Africa's Talking" ,
        name:"Africastalking"
    },
    { src: '/assets/atlassian.png', alt: 'Atlassian',
        name:"Atlassian Meru ACE"
     },
    { src: '/assets/CS.png', alt: 'CSquared',
        name:"Csquared"
     },
    { src: '/assets/microsoft.png', alt: 'Microsoft',
       name:"Microsoft Kenya"
     },
     { src: '/assets/jitu.png', alt: 'theJitu',
    }
  ];

  ngOnInit(): void {
    // Clone the logos array to create the infinite scrolling effect
    this.logos = [...this.logos, ...this.logos];
  }
}
